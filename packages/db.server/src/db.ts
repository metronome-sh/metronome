import { remember } from '@epic-web/remember';
import { env } from '@metronome/env.server';
import { drizzle } from 'drizzle-orm/postgres-js';
import { customAlphabet } from 'nanoid';
import postgres from 'postgres';

import * as schema from './schema';

export const db = remember('drizzle', () => {
  const { readableUrl, writableUrl } = env.db();

  const readablePg = postgres(readableUrl);
  const writablePg = postgres(writableUrl);

  const readableDrizzle = drizzle(readablePg, { schema });
  const writableDrizzle = drizzle(writablePg, { schema });

  return (options?: { writable?: boolean }) => {
    return options?.writable ? writableDrizzle : readableDrizzle;
  };
});

// prettier-ignore
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 10);

const prefixes = {
  user: 'usr',
  team: 'tm',
  project: 'prj',
  apiKey: 'ak',
} as const;

type Key = keyof typeof prefixes;
type Prefix = (typeof prefixes)[Key];

/**
 * Generates a unique ID for a given key.
 * @param key
 * @param size
 * @returns string
 */
export function id(key: Key, size = 10): `${Prefix}_${string}` {
  const prefix = prefixes[key];
  return `${prefix}_${nanoid(size)}`;
}
