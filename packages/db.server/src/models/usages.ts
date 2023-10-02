import { Temporal } from '@js-temporal/polyfill';
import { and, between, eq, sql } from 'drizzle-orm';

import { db } from '../db';
import { getUsagesAggregatedView, usages } from '../schema';
import { NewUsage, Usage } from '../types';

export async function create(newUsage: NewUsage): Promise<Usage> {
  const [usage] = await db({ write: true })
    .insert(usages)
    .values({ ...newUsage })
    .returning();

  return usage;
}

export async function project({
  projectId,
  range: { from, to },
}: {
  projectId: string;
  range: {
    from: Temporal.ZonedDateTime;
    to: Temporal.ZonedDateTime;
  };
}) {
  const fromDate = new Date(from.toInstant().epochMilliseconds);
  const toDate = new Date(to.toInstant().epochMilliseconds);

  const usages = getUsagesAggregatedView({ interval: 'day' });

  const [result = { usage: 0n }] = await db()
    .select({
      usage: sql<bigint>`sum(${usages.events})`,
    })
    .from(usages)
    .where(
      and(
        between(usages.timestamp, fromDate, toDate),
        eq(usages.projectId, projectId),
      ),
    )
    .groupBy(usages.projectId);

  return result.usage.toString();
}
