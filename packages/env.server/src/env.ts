import { config } from 'dotenv';
import path from 'path';
import { invariant } from 'ts-invariant';

const envPath = path.resolve(process.cwd(), '../../.env');
config({ path: envPath });

export function optional(
  envVarName: string,
  defaultValue?: string,
): string | undefined {
  const envVar = process.env[envVarName];
  if (!envVar) {
    console.warn(`Warning: environment ${envVarName} variable is not defined`);
  }
  return envVar ?? defaultValue;
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
 * Determines if the current environment is test.
 */
export const test = defined('NODE_ENV') === 'test';

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

export function producer() {
  return {
    apiKey: optional('PRODUCER_PROJECT_API_KEY'),
  };
}

/**
 * Redis queue configuration
 * @returns {Object}
 */
export function queues() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const url = defined('REDIS_QUEUE_URL');

  const password = production
    ? defined('REDIS_QUEUE_PASSWORD')
    : optional('REDIS_QUEUE_PASSWORD');

  const family = Number(optional('REDIS_QUEUE_FAMILY', '4'));

  return { url, password, family };
}

/**
 * Redis cache configuration
 * @returns {Object}
 */
export const cache = Object.assign(
  function cache() {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const url = defined('REDIS_CACHE_URL');

    const password = production
      ? defined('REDIS_CACHE_PASSWORD')
      : optional('REDIS_CACHE_PASSWORD');

    const family = Number(optional('REDIS_CACHE_FAMILY', '4'));

    return { url, password, family };
  },
  {
    unique() {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const url = defined('REDIS_UNIQUE_URL');

      const password = production
        ? defined('REDIS_UNIQUE_PASSWORD')
        : optional('REDIS_UNIQUE_PASSWORD');

      const family = Number(optional('REDIS_UNIQUE_FAMILY', '4'));

      return { url, password, family };
    },
  },
);

/**
 * Returns the value of the environment variable based on the current environment.
 * @param environment
 * @returns
 */
export function when<T>(environment: {
  production: T | (() => T);
  development?: T | (() => T);
  test?: T | (() => T);
}): T {
  function castProduction() {
    return typeof environment.production === 'function'
      ? (environment.production as () => T)()
      : environment.production;
  }

  function castDevelopment() {
    return typeof environment.development === 'function'
      ? (environment.development as () => T)()
      : environment.development;
  }

  function castTest() {
    return typeof environment.test === 'function'
      ? (environment.test as () => T)()
      : environment.test;
  }

  if (production) {
    return castProduction();
  }

  if (test) {
    return castTest() || castProduction();
  }

  return typeof environment.development !== undefined
    ? castDevelopment()!
    : castProduction();
}
