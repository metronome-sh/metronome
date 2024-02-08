import { and, between, eq, sql } from 'drizzle-orm';
import { throttleTime } from 'rxjs';
import { prettyPrintZodError } from 'src/utils/prettyPrintZodError';

import { db } from '../../db';
import {
  getWebVitalsOverviewAggregatedView,
  getWebVitalsRoutesAggregatedView,
  webVitals,
} from '../../schema';
import { WebVitalEventSchema } from '../../schemaValidation';
import {
  Interval,
  Project,
  Range,
  RouteVitals,
  ScoredWebVital,
  WebVitalEvent,
  WebVitalName,
} from '../../types';
import { getDeviceProps } from '../../utils/device';
import { observable, operators } from '../../utils/events';
import { resolveIp } from '../../utils/ip';
import { EMPTY_SCORED_WEB_VITALS } from './constants';
import { getScore } from './getScore';

export function isWebVitalEvent(event: unknown): event is WebVitalEvent {
  const result = WebVitalEventSchema.safeParse(event);
  return result.success;
}

export async function insert(project: Project, webVitalEvent: WebVitalEvent) {
  const {
    details: {
      timestamp,
      metric: { name, value },
      deviceCategory,
      ua,
      connection,
      routeId,
      routePath,
      ip,
    },
  } = webVitalEvent;

  const { type } = getDeviceProps(ua);

  const geo = await resolveIp(ip);

  await db({ write: true })
    .insert(webVitals)
    .values({
      teamId: project.teamId,
      projectId: project.id,
      timestamp: new Date(timestamp),
      name,
      value: `${value}`,
      deviceCategory,
      deviceType: type,
      deviceConnection: connection,
      routeId,
      pathname: routePath ?? '',
      ...geo,
    });
}

export async function overview({
  project,
  range: { from, to },
  interval = 'hour',
}: {
  project: Project;
  range: Range;
  interval: Interval;
}): Promise<ScoredWebVital[]> {
  const webVitals = await getWebVitalsOverviewAggregatedView({
    timeZoneId: from.timeZoneId,
    interval: interval,
  });

  const fromDate = new Date(from.epochMilliseconds);
  const toDate = new Date(to.epochMilliseconds);

  const result = await db()
    .select({
      name: webVitals.name,
      valueP75: sql<number>`approx_percentile(0.75, rollup(${webVitals.valuePctAgg}))`,
    })
    .from(webVitals)
    .where(and(eq(webVitals.projectId, project.id), between(webVitals.timestamp, fromDate, toDate)))
    .groupBy(webVitals.name);

  const vitals = EMPTY_SCORED_WEB_VITALS.reduce((acc, filler) => {
    const row = result.find((row) => row.name === filler.name);

    let scoredRow = filler;

    if (row) {
      const { name, valueP75: p75 } = row;

      scoredRow = {
        name: name as WebVitalName,
        values: { p50: null, p75, p90: null, p95: null, p99: null },
        // prettier-ignore
        scores: { p50: null, p75: getScore(name, p75), p90: null, p95: null, p99: null, },
      };
    }

    return [...acc, scoredRow];
  }, [] as ScoredWebVital[]);

  return vitals;
}

export async function watch(
  project: Project,
  callback: (event: { ts: number }) => Promise<void>,
): Promise<() => void> {
  await callback({ ts: Date.now() });

  const subscription = observable
    .pipe(
      operators.project(project),
      operators.events(['web-vital']),
      throttleTime(10000, undefined, { leading: true, trailing: true }),
    )
    .subscribe(async ([e]) => {
      await callback({ ts: e.returnvalue.ts });
    });

  return () => subscription.unsubscribe();
}

export async function breakdownByRoute({
  project,
  range: { from, to },
  interval = 'hour',
}: {
  project: Project;
  range: Range;
  interval: Interval;
}) {
  const webVitals = await getWebVitalsRoutesAggregatedView({
    timeZoneId: from.timeZoneId,
    interval: interval,
  });

  const fromDate = new Date(from.epochMilliseconds);

  const toDate = new Date(to.epochMilliseconds);

  const result = await db()
    .select({
      name: webVitals.name,
      routeId: webVitals.remixRouteId,
      valueP75: sql<number>`approx_percentile(0.75, rollup(${webVitals.valuePctAgg}))`,
    })
    .from(webVitals)
    .where(and(eq(webVitals.projectId, project.id), between(webVitals.timestamp, fromDate, toDate)))
    .groupBy(webVitals.name, webVitals.remixRouteId);

  const groupedByRoute = result.reduce(
    (acc, row) => {
      const { routeId, name, valueP75 } = row;

      const scoredRow: ScoredWebVital = {
        name: name as WebVitalName,
        values: { p50: null, p75: valueP75, p90: null, p95: null, p99: null },
        scores: { p50: null, p75: getScore(name, valueP75), p90: null, p95: null, p99: null },
      };

      if (!acc[routeId]) {
        acc[routeId] = {
          routeId,
          FCP: null,
          LCP: null,
          CLS: null,
          FID: null,
          TTFB: null,
          INP: null,
        };
      }

      acc[routeId] = { ...acc[routeId], [name]: scoredRow };

      return acc;
    },
    {} as Record<string, RouteVitals>,
  );

  return Object.values(groupedByRoute);
}
