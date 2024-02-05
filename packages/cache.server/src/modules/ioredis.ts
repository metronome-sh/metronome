import { remember } from '@epic-web/remember';
import { env } from '@metronome/env.server';
import IOredis from 'ioredis';

export const ioredis = remember('cache.ioredis', () => {
  const { url, password, family } = env.cache();
  return new IOredis(url, {
    maxRetriesPerRequest: null,
    password,
    family,
  });
});

export const ioredisUnique = remember('cache.ioredisUnique', () => {
  const { url, password, family } = env.cache({ unique: true });
  return new IOredis(url, {
    maxRetriesPerRequest: null,
    password,
    family,
  });
});
