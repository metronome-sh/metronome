import { and, between, eq, sql } from 'drizzle-orm';
import { throttleTime } from 'rxjs';

import { db } from '../../db';
import { getWebVitalsOverviewAggregatedView, webVitals } from '../../schema';
import { WebVitalEventSchema } from '../../schemaValidation';
import {
  Interval,
  Project,
  Range,
  ScoredWebVital,
  WebVitalEvent,
  WebVitalName,
} from '../../types';
import { getDeviceProps } from '../../utils/device';
import { observable, operators } from '../../utils/events';
// import { resolveIp } from '../../utils/ip';
// import { WebVitalEventSchema } from '../models.schemas';
import { EMPTY_SCORED_WEB_VITALS } from './constants';
import { getScore } from './getScore';

export function isWebVitalEvent(event: unknown): event is WebVitalEvent {
  const result = WebVitalEventSchema.safeParse(event);
  return result.success;
}

export async function create(project: Project, webVitalEvent: WebVitalEvent) {
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

  // const geo = resolveIp(ip);
  const geo = {
    countryCode: 'unknown',
    country: 'unknown',
    region: 'unknown',
    city: 'unknown',
  };

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
    .where(
      and(
        eq(webVitals.projectId, project.id),
        between(webVitals.timestamp, fromDate, toDate),
      ),
    )
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
