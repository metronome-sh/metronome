// import { and, between, eq, sql } from 'drizzle-orm';

// import { throttleTime } from 'rxjs';
// import { toPostgresTzName } from '../../utils/aggregations';
// import { resolveIp } from '../../utils/ip';
import { db } from '../db';
import { requests } from '../schema';
import { RequestEventSchema } from '../schemaValidation';
import { Project, RequestEvent } from '../types';
// import { observable, operators } from '../utils/events';
// import { getTimeZonedAggregatedView, requests } from './requests.schema';
// import { RequestFunctionArgs, RequestOverview } from './requests.types';

export function isRequestEvent(event: unknown): event is RequestEvent {
  const result = RequestEventSchema.safeParse(event);
  return result.success;
}

export async function create(project: Project, requestEvent: RequestEvent) {
  const {
    details: { timestamp, duration, method, statusCode, pathname, type, ip },
  } = requestEvent;

  // const geo = resolveIp(ip);
  const geo = {
    countryCode: 'unknown',
    country: 'unknown',
    region: 'unknown',
    city: 'unknown',
  };

  await db({ write: true })
    .insert(requests)
    .values({
      teamId: project.teamId,
      projectId: project.id,
      timestamp: new Date(timestamp),
      duration: BigInt(duration),
      method,
      statusCode,
      pathname,
      requestType: type,
      ...geo,
    });
}

// export async function overview({
//   project,
//   range: { from, to },
//   by = 'hour',
// }: RequestFunctionArgs): Promise<RequestOverview> {
//   const requests = await getTimeZonedAggregatedView({
//     timeZone: from.timeZoneId,
//     interval: by,
//   });

//   const fromDate = new Date(from.toInstant().epochMilliseconds);
//   const toDate = new Date(to.toInstant().epochMilliseconds);

//   const result = await drizzle()
//     .select({
//       count: sql<number>`sum(${requests.count})::integer`,
//       dataCount: sql<number>`sum(${requests.dataCount})::integer`,
//       documentCount: sql<number>`sum(${requests.documentCount})::integer`,
//       durationP50: sql<number>`approx_percentile(0.5, rollup(${requests.durationPctAgg}))`,
//     })
//     .from(requests)
//     .where(
//       and(
//         between(requests.timestamp, fromDate, toDate),
//         eq(requests.organizationId, project.organizationId),
//         eq(requests.projectId, project.id),
//       ),
//     );

//   if (result.length === 0) {
//     return {
//       count: null,
//       duration: { p50: null },
//       dataCount: null,
//       documentCount: null,
//     };
//   }

//   const [{ count, durationP50, dataCount, documentCount }] = result;

//   return {
//     count: count,
//     duration: { p50: durationP50 },
//     dataCount: dataCount,
//     documentCount: documentCount,
//   };
// }

// export async function countSeries({
//   project,
//   range: { from, to },
//   by = 'hour',
// }: RequestFunctionArgs) {
//   const requests = await getTimeZonedAggregatedView({
//     timeZone: from.timeZoneId,
//     interval: by,
//   });

//   const fromDate = new Date(from.toInstant().epochMilliseconds);
//   const toDate = new Date(to.toInstant().epochMilliseconds);

//   const pgTz = await toPostgresTzName({ timeZone: from.timeZoneId });

//   const result = await drizzle()
//     .select({
//       // prettier-ignore
//       timestamp: sql<Date>`time_bucket_gapfill('1 ${sql.raw(by)}', ${requests.timestamp}, ${sql.raw(pgTz)})`,
//       documentCount: sql<
//         number | null
//       >`sum(${requests.documentCount})::integer`,
//       dataCount: sql<number | null>`sum(${requests.dataCount})::integer`,
//     })
//     .from(requests)
//     .where(
//       and(
//         between(requests.timestamp, fromDate, toDate),
//         eq(requests.organizationId, project.organizationId),
//         eq(requests.projectId, project.id),
//       ),
//     )
//     .groupBy(sql.raw('1'));

//   const series = result.map(({ timestamp, dataCount, documentCount }) => ({
//     timestamp: timestamp.valueOf(),
//     dataCount,
//     documentCount,
//   }));

//   return { series };
// }

// export function watch(
//   { project, events = ['request'] }: { project: Project; events?: 'request'[] },
//   callback: (event: {
//     name: (typeof events)[number];
//     ts: number;
//   }) => Promise<void>,
// ): () => void {
//   callback({ name: events[0], ts: Date.now() });

//   const subscription = observable()
//     .pipe(
//       operators.project(project),
//       operators.event(events),
//       throttleTime(1000, undefined, { leading: true, trailing: true }),
//     )
//     .subscribe(([e]) => {
//       callback({
//         name: e.returnvalue.event.name as (typeof events)[number],
//         ts: e.returnvalue.event.ts,
//       });
//     });

//   return () => subscription.unsubscribe();
// }
