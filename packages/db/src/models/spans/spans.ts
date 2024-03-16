import { prettyPrintZodError } from 'src/utils/prettyPrintZodError';
import { clickhouse } from '../../modules/clickhouse';
import { ClickHouseSpan, SpanInput } from './spans.types';
import { z } from 'zod';
import { Project } from '../../types';
import * as events from '../events/events';
import { EventSchema } from '../events/events';

export const SpanSchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: z.number(),
  startTime: z.number(),
  endTime: z.number(),
  attributes: z.record(z.string()),
  events: z.array(EventSchema),
  context: z.object({ traceId: z.string() }).passthrough(),
});

export function valid(spanOrSpans: unknown): spanOrSpans is SpanInput | SpanInput[] {
  const schema = z.array(SpanSchema);
  const result = schema.safeParse(spanOrSpans);

  if (!result.success) {
    prettyPrintZodError(result.error);
  }

  return result.success;
}

export async function create({
  spanOrSpans,
  project,
}: {
  spanOrSpans: SpanInput | SpanInput[];
  project: Project;
}): Promise<void> {
  const spans = Array.isArray(spanOrSpans) ? spanOrSpans : [spanOrSpans];

  const values: ClickHouseSpan[] = spans.map((s) => {
    // Do not store client.address or user_agent.original
    const attributeDenyList = ['client.address', 'user_agent.original'];
    const attributesEntries = Object.entries(s.attributes).filter(
      ([key]) => !attributeDenyList.includes(key),
    );

    const [attributesKeys, attributesValues] = attributesEntries.reduce(
      (acc, [key, value]) => [
        [...acc[0], key],
        [...acc[1], value],
      ],
      [[], []] as [string[], string[]],
    );

    return {
      project_id: project.id,
      trace_id: s.context.traceId,
      span_id: s.id,
      kind: s.kind,
      parent_span_id: null,
      name: s.name,
      start_time: s.startTime,
      end_time: s.endTime,
      'span_attributes.key': attributesKeys,
      'span_attributes.value': attributesValues,
    };
  });

  await clickhouse.insert({
    table: 'spans',
    values,
    format: 'JSONEachRow',
  });

  await events.createFromSpans({ spanOrSpans, project });
}
