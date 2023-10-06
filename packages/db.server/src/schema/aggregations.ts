/* eslint-disable @typescript-eslint/no-use-before-define */
import { sql } from 'drizzle-orm';
import {
  bigint,
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { Interval } from '../types';
import {
  createTimeOffsetAggregatedView,
  tableName,
  timeOffsetAggregatedTableExists,
} from '../utils/aggregations';
import { getTimeZoneOffset } from '../utils/timeZones';
import { webVitalName } from './schema';

export function getUsagesAggregatedView({
  interval,
}: {
  interval: 'hour' | 'day' | 'week' | 'month';
}) {
  const aggregatedSchema = {
    teamId: text('team_id').notNull(),
    projectId: text('project_id').notNull(),
    timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
    events: bigint('events', { mode: 'bigint' }).notNull(),
  };

  const usagesAggregatedTables = {
    hour: pgTable('usages_hourly', aggregatedSchema),
    day: pgTable('usages_daily', aggregatedSchema),
    week: pgTable('usages_weekly', aggregatedSchema),
    month: pgTable('usages_monthly', aggregatedSchema),
  };

  return usagesAggregatedTables[interval];
}

export async function getRequestsOverviewAggregatedView(
  timeZoneId: string,
  interval: Interval,
) {
  const aggregatedSchemaColumns = {
    teamId: text('team_id').notNull(),
    projectId: text('project_id').notNull(),
    timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
    count: integer('count').notNull(),
    documentCount: integer('document_count').notNull(),
    dataCount: integer('data_count').notNull(),
    durationPctAgg: integer('duration_pct_agg').notNull(),
  };

  const offset = getTimeZoneOffset(timeZoneId);
  const name = tableName({ base: 'requests', offset, interval });

  const exists = await timeOffsetAggregatedTableExists({
    base: 'requests',
    offset,
    interval,
  });

  if (exists) {
    return pgTable(name, aggregatedSchemaColumns);
  }

  await createTimeOffsetAggregatedView({
    from: 'requests',
    base: 'requests',
    offset,
    interval,
    definitions: {
      hour: ({ baseTable, timeZone }) => sql`
        SELECT
          team_id,
          project_id,
          time_bucket('1 hour', "timestamp", ${sql.raw(timeZone)}) AS timestamp,
          count(*) AS count,
          count(*) FILTER (WHERE request_type = 'document') AS document_count,
          count(*) FILTER (WHERE request_type = 'data') AS data_count,
          percentile_agg(duration) as duration_pct_agg
        FROM ${sql.raw(baseTable)}
        GROUP BY 1, 2, 3
      `,
      day: ({ hourTable, timeZone }) => sql`
        SELECT
          team_id,
          project_id,
          time_bucket('1 day', "timestamp", ${sql.raw(timeZone)}) AS timestamp,
          sum(count) AS count,
          sum(document_count) AS document_count,
          sum(data_count) AS data_count,
          rollup(duration_pct_agg) as duration_pct_agg
        FROM ${sql.raw(hourTable)}
        GROUP BY 1, 2, 3
      `,
      week: ({ dayTable, timeZone }) => sql`
        SELECT
          team_id,
          project_id,
          time_bucket('1 week', "timestamp", ${sql.raw(timeZone)}) AS timestamp,
          sum(count) AS count,
          sum(document_count) AS document_count,
          sum(data_count) AS data_count,
          rollup(duration_pct_agg) as duration_pct_agg
        FROM ${sql.raw(dayTable)}
        GROUP BY 1, 2, 3
      `,
      month: ({ dayTable, timeZone }) => sql`
        SELECT
          team_id,
          project_id, time_bucket('1 month', "timestamp", ${sql.raw(
            timeZone,
          )}) AS timestamp,
          sum(count) AS count,
          sum(document_count) AS document_count,
          sum(data_count) AS data_count,
          rollup(duration_pct_agg) as duration_pct_agg
        FROM ${sql.raw(dayTable)}
        GROUP BY 1, 2, 3
      `,
    },
  });

  return pgTable(name, aggregatedSchemaColumns);
}

export async function getRemixFunctionOverviewAggregatedView({
  base,
  timeZone: timeZoneId,
  interval,
}: {
  base: string;
  timeZone: string;
  interval: 'hour' | 'day' | 'week' | 'month';
}) {
  const aggregatedSchemaColumns = {
    teamId: text('team_id').notNull(),
    projectId: text('project_id').notNull(),
    timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
    count: integer('count').notNull(),
    erroredCount: integer('errored_count').notNull(),
    durationPctAgg: bigint('duration_pct_agg', { mode: 'bigint' }).notNull(), // TODO make correct type
  };

  const offset = getTimeZoneOffset(timeZoneId);
  const name = tableName({ base, offset, interval });
  const exists = await timeOffsetAggregatedTableExists({
    base,
    offset,
    interval,
  });

  if (exists) {
    return pgTable(name, aggregatedSchemaColumns);
  }

  await createTimeOffsetAggregatedView({
    from: base,
    base,
    offset,
    interval,
    definitions: {
      hour: ({ baseTable, timeZone }) => sql`
        SELECT
          team_id,
          project_id,
          time_bucket('1 hour', "timestamp", ${sql.raw(timeZone)}) AS timestamp,
          count(*) AS count,
          count(*) FILTER (WHERE errored = TRUE) AS errored_count,
          percentile_agg(duration) as duration_pct_agg
        FROM ${sql.raw(baseTable)}
        GROUP BY 1, 2, 3
      `,
      day: ({ hourTable, timeZone }) => sql`
        SELECT
          team_id,
          project_id,
          time_bucket('1 day', "timestamp", ${sql.raw(timeZone)}) AS timestamp,
          sum(count) AS count,
          sum(errored_count) AS errored_count,
          rollup(duration_pct_agg) as duration_pct_agg
        FROM ${sql.raw(hourTable)}
        GROUP BY 1, 2, 3
      `,
      week: ({ dayTable, timeZone }) => sql`
        SELECT
          team_id,
          project_id,
          time_bucket('1 week', "timestamp", ${sql.raw(timeZone)}) AS timestamp,
          sum(count) AS count,
          sum(errored_count) AS errored_count,
          rollup(duration_pct_agg) as duration_pct_agg
        FROM ${sql.raw(dayTable)}
        GROUP BY 1, 2, 3
      `,
      month: ({ dayTable, timeZone }) => sql`
        SELECT
          team_id,
          project_id,
          time_bucket('1 month', "timestamp", ${sql.raw(
            timeZone,
          )}) AS timestamp,
          sum(count) AS count,
          sum(errored_count) AS errored_count,
          rollup(duration_pct_agg) as duration_pct_agg
        FROM ${sql.raw(dayTable)}
        GROUP BY 1, 2, 3
      `,
    },
  });

  return pgTable(name, aggregatedSchemaColumns);
}

export async function getWebVitalsOverviewAggregatedView({
  timeZoneId,
  interval,
}: {
  timeZoneId: string;
  interval: 'hour' | 'day' | 'week' | 'month';
}) {
  const aggregatedSchema = {
    teamId: text('team_id').notNull(),
    projectId: text('project_id').notNull(),
    timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
    name: webVitalName('name').notNull(),
    count: integer('count').notNull(),
    valuePctAgg: decimal('value_pct_agg').notNull(),
    deviceCategory: text('device_category').notNull(),
  };

  const offset = getTimeZoneOffset(timeZoneId);
  const name = tableName({ base: 'web_vitals', offset, interval });
  const exists = await timeOffsetAggregatedTableExists({
    base: 'web_vitals',
    offset,
    interval,
  });

  if (exists) {
    return pgTable(name, aggregatedSchema);
  }

  await createTimeOffsetAggregatedView({
    from: 'web_vitals',
    base: 'web_vitals',
    offset,
    interval,
    definitions: {
      hour: ({ baseTable, timeZone }) => sql`
        SELECT
          team_id,
          project_id,
          name,
          device_category,
          time_bucket('1 hour', "timestamp", ${sql.raw(timeZone)}) AS timestamp,
          count(*) AS count,
          percentile_agg(value) as value_pct_agg
        FROM ${sql.raw(baseTable)}
        GROUP BY 1, 2, 3, 4, 5
      `,
      day: ({ hourTable, timeZone }) => sql`
        SELECT
          team_id,
          project_id,
          name,
          device_category,
          time_bucket('1 hour', "timestamp", ${sql.raw(timeZone)}) AS timestamp,
          count(*) AS count,
          rollup(value_pct_agg) as value_pct_agg
        FROM ${sql.raw(hourTable)}
        GROUP BY 1, 2, 3, 4, 5
      `,
      week: ({ dayTable, timeZone }) => sql`
        SELECT
          team_id,
          project_id,
          name,
          device_category,
          time_bucket('1 hour', "timestamp", ${sql.raw(timeZone)}) AS timestamp,
          count(*) AS count,
          rollup(value_pct_agg) as value_pct_agg
        FROM ${sql.raw(dayTable)}
        GROUP BY 1, 2, 3, 4, 5
      `,
      month: ({ dayTable, timeZone }) => sql`
        SELECT
          team_id,
          project_id,
          name,
          device_category,
          time_bucket('1 hour', "timestamp", ${sql.raw(timeZone)}) AS timestamp,
          count(*) AS count,
          rollup(value_pct_agg) as value_pct_agg
        FROM ${sql.raw(dayTable)}
        GROUP BY 1, 2, 3, 4, 5
      `,
    },
  });

  return pgTable(name, aggregatedSchema);
}
