import { actions, loaders, usages } from './';
import { create as createRequest, isRequestEvent } from './models/requests';
import { type Project } from './types';

export async function insertMetrics({
  project,
  unverifiedEvents,
}: {
  project: Project;
  unverifiedEvents: unknown;
}) {
  if (!Array.isArray(unverifiedEvents)) {
    // prettier-ignore
    throw new Error('Failed to process data: \n' + 'unverifiedEvents is not an array');
  }

  const eventNames = new Set<string>();

  const settled = await Promise.allSettled(
    unverifiedEvents.map((event) => {
      // if (pageviews.isPageviewEvent(event)) {
      //   names.add(event.name);
      //   return pageviews.insert(project, event);
      // }

      if (isRequestEvent(event)) {
        eventNames.add(event.name);
        return createRequest(project, event);
      }

      if (loaders.isLoaderEvent(event)) {
        eventNames.add(event.name);
        return loaders.insert(project, event);
      }

      if (actions.isActionEvent(event)) {
        eventNames.add(event.name);
        return actions.insert(project, event);
      }

      // if (webVitals.isWebVitalEvent(event)) {
      //   names.add(event.name);
      //   return webVitals.insert(project, event);
      // }
    }),
  );

  const failures = settled.filter((s) => s.status === 'rejected');

  await usages.create({
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
