import { remember } from '@epic-web/remember';
import { env } from '@metronome/env.server';
import IOredis from 'ioredis';

const { url, password, family } = env.queues();

export const connection = remember('ioredis', () => {
  return new IOredis(url, { maxRetriesPerRequest: null, password, family });
});
