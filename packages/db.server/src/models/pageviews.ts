import { db } from '../db';
import { pageviews } from '../schema';
import { PageviewEventSchema } from '../schemaValidation';
import { PageviewEvent, Project } from '../types';
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
