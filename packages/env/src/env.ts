import dotenv from 'dotenv';
import path from 'path';
import { invariant } from 'ts-invariant';

const envPath = path.resolve(process.cwd(), '../../.env');
dotenv.config({ path: envPath });

/**
 * Determines if the current environment is development.
 */
export const dev = process.env.NODE_ENV === 'development';

/**
 * Determines if the current environment is production.
 */
export const production = process.env.NODE_ENV === 'production';

export function db() {
  invariant(process.env.DB_DATABASE, 'DB_DATABASE env is not defined');
  invariant(process.env.DB_USER, 'DB_USER env is not defined');
  invariant(process.env.DB_PASSWORD, 'DB_PASSWORD env is not defined');
  invariant(process.env.DB_HOST, 'DB_HOST env is not defined');

  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const database = process.env.DB_DATABASE;

  const readableUrl = `postgres://${user}:${password}@${host}/${database}`;

  const writableUser = process.env.DB_WRITABLE_USER;
  const writablePassword = process.env.DB_WRITABLE_PASSWORD;
  const writableHost = process.env.DB_WRITABLE_HOST;
  const writableDatabase = process.env.DB_WRITABLE_DATABASE;

  // prettier-ignore
  const writableUrlCanBeUsed = writableUser && writablePassword && writableHost && writableDatabase;

  if (production && !writableUrlCanBeUsed) {
    console.warn(
      'Writable database URL is not defined. Using read-only database URL.',
    );
  }

  const writableUrl = writableUrlCanBeUsed
    ? `postgres://${writableUser}:${writablePassword}@${writableHost}/${writableDatabase}`
    : readableUrl;

  return { readableUrl, writableUrl };
}
