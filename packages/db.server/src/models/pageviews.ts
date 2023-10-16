import { and, between, eq, sql } from 'drizzle-orm';

import { db } from '../db';
import { getPageviewsOverviewAggregatedView, pageviews } from '../schema';
import { PageviewEventSchema } from '../schemaValidation';
import { Interval, PageviewEvent, Project, Range } from '../types';
import { observable, operators, throttleTime } from '../utils/events';
import { resolveReferrer } from '../utils/referrer';
import { upsert as upsertSession } from './sessions';

export function isPageviewEvent(event: unknown): event is PageviewEvent {
  const result = PageviewEventSchema.safeParse(event);
  return result.success;
}

export async function insert(project: Project, pageviewEvent: PageviewEvent) {
  const { sessionId, userId } = await upsertSession(project, pageviewEvent);

  const {
    details: { timestamp, routeId, routePath = '', hash, pathname, query, ip },
  } = pageviewEvent;

  const { referrer, referrerDomain } = resolveReferrer(
    pageviewEvent.details.referrer,
  );

  // const geo = resolveIp(ip);
  const geo = {
    countryCode: 'unknown',
    country: 'unknown',
    region: 'unknown',
    city: 'unknown',
  };

  await db({ write: true })
    .insert(pageviews)
    .values({
      teamId: project.teamId,
      projectId: project.id,
      sessionId,
      userId,
      timestamp: new Date(timestamp),
      routeId,
      routePath,
      hash,
      urlPath: pathname,
      urlQuery: query,
      referrer: referrer,
      referrerDomain: referrerDomain,
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
}) {
  const pageviews = await getPageviewsOverviewAggregatedView({
    timeZoneId: from.timeZoneId,
    interval,
  });

  const fromDate = new Date(from.toInstant().epochMilliseconds);
  const toDate = new Date(to.toInstant().epochMilliseconds);

  const [{ pageviewCount } = { pageviewCount: 0 }] = await db()
    .select({
      pageviewCount: sql<number>`sum(${pageviews.count})::integer`,
    })
    .from(pageviews)
    .where(
      and(
        eq(pageviews.organizationId, project.teamId),
        eq(pageviews.projectId, project.id),
        between(pageviews.timestamp, fromDate, toDate),
      ),
    );

  return { pageviewCount };
}

export function watch(
  project: Project,
  callback: (event: { ts: number }) => Promise<void>,
): () => void {
  callback({ ts: Date.now() });

  const subscription = observable
    .pipe(
      operators.project(project),
      operators.events(['pageview']),
      throttleTime(1000, undefined, { leading: true, trailing: true }),
    )
    .subscribe((data) => {
      const [e] = data;

      callback({
        ts: e.returnvalue.ts,
      });
    });

  return () => subscription.unsubscribe();
}
