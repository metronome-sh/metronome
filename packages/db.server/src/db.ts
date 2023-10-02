import { remember } from '@epic-web/remember';
import { env } from '@metronome/env.server';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

export const db = remember('drizzle', () => {
  const { readableUrl, writableUrl } = env.db();

  const readablePg = postgres(readableUrl);
  const writablePg = postgres(writableUrl);

  const readableDrizzle = drizzle(readablePg, { schema });
  const writableDrizzle = drizzle(writablePg, { schema });

  return (options?: { write?: boolean }) => {
    return options?.write ? writableDrizzle : readableDrizzle;
  };
});
