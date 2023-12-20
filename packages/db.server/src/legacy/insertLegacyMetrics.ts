import { z } from 'zod';
import { LegacysPanSchema } from './legacySpan';
import {
  transformLegacyAction,
  transformLegacyLoader,
  transformLegacyRequest,
  transformLegacyWebVitals,
} from './transformers';
import { requests, usages, loaders, actions, webVitals } from '../';

type TransformedSpan = ReturnType<
  | typeof transformLegacyRequest
  | typeof transformLegacyLoader
  | typeof transformLegacyAction
  | typeof transformLegacyWebVitals
>;

function isTransformedSpan(value: TransformedSpan | false): value is TransformedSpan {
  return value !== false;
}

export async function insertLegacyMetrics({
  project,
  unverifiedEvents,
}: {
  project: any;
  unverifiedEvents: any;
}): Promise<string[]> {
  const spans = z.array(LegacysPanSchema).safeParse(unverifiedEvents);

  if (!spans.success) {
    throw new Error('Failed to process data: \n' + spans.error.message);
  }

  const transformedSpans = spans.data
    .map((span) => {
      if (span.name === 'request') {
        return transformLegacyRequest(span);
      }

      if (span.name === 'loader') {
        return transformLegacyLoader(span);
      }

      if (span.name === 'action') {
        return transformLegacyAction(span);
      }

      if (span.name === 'vital') {
        return transformLegacyWebVitals(span);
      }

      return false;
    })
    .filter(isTransformedSpan);

  const eventNames = new Set<string>();

  const settled = await Promise.allSettled(
    transformedSpans.map((event) => {
      if (requests.isRequestEvent(event)) {
        eventNames.add(event.name);
        return requests.insert(project, event);
      }

      if (loaders.isLoaderEvent(event)) {
        eventNames.add(event.name);
        return loaders.insert(project, event);
      }

      if (actions.isActionEvent(event)) {
        eventNames.add(event.name);
        return actions.insert(project, event);
      }

      if (webVitals.isWebVitalEvent(event)) {
        eventNames.add(event.name);
        return webVitals.insert(project, event);
      }

      // @ts-expect-error
      console.warn(`Failed to process data: unknown event type ${event.name}`);
    }),
  );

  const failures = settled.filter((s) => s.status === 'rejected');

  await usages.insert({
    projectId: project.id,
    teamId: project.teamId,
    events: BigInt(unverifiedEvents.length),
  });

  if (failures.length) {
    // prettier-ignore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    throw new Error('Failed to process data: \n' + failures.map((r) => (r as any).reason).join('\n'));
  }

  return [...eventNames];
}
