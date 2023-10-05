import { refreshAggregation } from '@metronome/db.server';
import { queues } from '@metronome/queues.server';

export async function aggregations(job: typeof queues.aggregations.$inferJob) {
  const { data } = job;
  const { aggregation, watermark } = data;

  await refreshAggregation({ aggregation, watermark });

  return `aggregation for ${aggregation} completed`;
}
