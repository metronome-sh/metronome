import { config } from 'dotenv';
import path from 'path';
import { invariant } from 'ts-invariant';

const envPath = path.resolve(process.cwd(), '../../.env');
config({ path: envPath });

export function optional(envVarName: string): string | undefined {
  const envVar = process.env[envVarName];
  if (!envVar) {
    console.warn(`Warning: environment ${envVarName} variable is not defined`);
  }
  return envVar;
}

export function defined(envVarName: string): string {
  const envVar = process.env[envVarName];
  invariant(envVar, `Environment ${envVarName} variable is not defined`);
  return envVar;
}

/**
 * Determines if the current environment is development.
 */
export const dev = defined('NODE_ENV') === 'development';

/**
 * Determines if the current environment is production.
 */
export const production = defined('NODE_ENV') === 'production';

/**
 * DB Connection URLs.
 * @returns Object with readable and writable database URLs.
 */
export function db() {
  const user = defined('DB_READ_USER');
  const password = defined('DB_READ_PASSWORD');
  const host = defined('DB_READ_HOST');
  const database = defined('DB_READ_DATABASE');
  const port = defined('DB_READ_PORT');

  const readableUrl = `postgres://${user}:${password}@${host}:${port}/${database}`;

  const writeUser = optional('DB_WRITE_USER');
  const writePassword = optional('DB_WRITE_PASSWORD');
  const writeHost = optional('DB_WRITE_HOST');
  const writeDatabase = optional('DB_WRITE_DATABASE');
  const writePort = optional('DB_WRITE_PORT');

  // prettier-ignore
  const writeUrlCanBeUsed = writeUser && writePassword && writeHost && writeDatabase && writePort;

  if (production && !writeUrlCanBeUsed) {
    console.warn(
      'Writable database URL is not defined. Using read-only database URL.',
    );
  }

  const writableUrl = writeUrlCanBeUsed
    ? `postgres://${writeUser}:${writePassword}@${writeHost}/${writeDatabase}`
    : readableUrl;

  return { readableUrl, writableUrl };
}

export function session() {
  const sessionSecret = defined('SESSION_SECRET');

  return {
    sessionName: process.env.SESSION_NAME ?? 'metronome',
    sessionSecret,
  };
}

export function url(pathname: string) {
  const appUrl = defined('APP_URL');
  return `${appUrl}${pathname}`;
}

export function kafka() {
  const brokers = defined('KAFKA_BROKERS');

  return {
    brokers: brokers.split(','),
  };
}
