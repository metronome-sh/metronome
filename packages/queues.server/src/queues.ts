import { createQueue } from './createQueue';

export const metrics = createQueue<{ apiKey: string; data: unknown }>(
  'metrics',
  {
    removeOnComplete: true,
    removeOnFail: true,
    attempts: 288 * 2, // 2 days worth of attempts
    backoff: {
      type: 'fixed',
      delay: 1000 * 60 * 5, // 5 minutes
    },
  },
);

export const events = createQueue<{
  projectId: string;
  eventsNames: string[];
  ts: number;
}>('events', {
  removeOnComplete: true,
  removeOnFail: true,
  priority: 1,
  attempts: 1,
});

export const aggregations = createQueue<{
  aggregation: string;
  watermark: '1 hour' | '1 day' | '1 week' | '1 month';
}>('aggregations', {
  removeOnComplete: true,
  removeOnFail: true,
  priority: 1,
  attempts: 1,
});
