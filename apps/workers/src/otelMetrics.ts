import { queues } from '@metronome/queues';

export async function otelMetrics(job: typeof queues.otelMetrics.$inferJob) {
  const {
    data: { apiKey, metrics },
  } = job;

  // console.log({ apiKey, metrics });
}
