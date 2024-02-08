import { Project } from '../../types';
import { clickhouse } from '../../modules/clickhouse';
import { Span } from '../spans/spans.types';
import { ClickHouseEvent } from './events.types';
import { z } from 'zod';

export const EventSchema = z.object({
  name: z.string(),
  attributes: z.record(z.string()),
  timestamp: z.number(),
});

export async function createFromSpans({
  spanOrSpans,
  project,
}: {
  spanOrSpans: Span | Span[];
  project: Project;
}): Promise<void> {
  const spans = Array.isArray(spanOrSpans) ? spanOrSpans : [spanOrSpans];

  const values: ClickHouseEvent[] = spans.flatMap((s) => {
    return s.events.map((e) => {
      const attributesKeys = Object.keys(e.attributes);
      const attributesValues = Object.values(e.attributes);

      return {
        project_id: project.id,
        trace_id: s.context.traceId,
        span_id: s.id,
        name: e.name,
        timestamp: e.timestamp,
        'event_attributes.key': attributesKeys,
        'event_attributes.value': attributesValues,
      };
    });
  });

  await clickhouse.insert({
    table: 'events',
    values,
    format: 'JSONEachRow',
  });
}
