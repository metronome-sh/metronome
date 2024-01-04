import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { invariant } from 'ts-invariant';

export class Environment {
  /**
   * Determines if the current environment is production.
   */
  public dev: boolean = true;

  /**
   * Determines if the current environment is test.
   */
  public production: boolean = false;

  /**
   * Determines if the current environment is test.
   */
  public test: boolean = false;

  constructor() {
    let envPath = path.resolve(process.cwd(), '../../.env');

    if (!fs.existsSync(envPath)) {
      envPath = path.resolve(process.cwd(), '../../../.env');
    }

    config({ path: envPath });

    this.dev = this.defined('NODE_ENV') === 'development';

    this.production = this.defined('NODE_ENV') === 'production';

    this.test = this.defined('NODE_ENV') === 'test';
  }

  protected optional<T = string>(envVarName: string, defaultValue?: T): T | string | undefined {
    const envVar = process.env[envVarName];
    if (!envVar) {
      console.warn(`Warning: environment ${envVarName} variable is not defined`);
    }
    return envVar ?? defaultValue;
  }

  protected defined(envVarName: string): string {
    const envVar = process.env[envVarName];
    invariant(envVar, `Environment ${envVarName} variable is not defined`);
    return envVar;
  }

  protected required = this.defined;

  /**
   * DB Connection URLs.
   * @returns Object with readable and writable database URLs.
   */
  public db() {
    const user = this.defined('DB_READ_USER');
    const password = this.defined('DB_READ_PASSWORD');
    const host = this.defined('DB_READ_HOST');
    const database = this.defined('DB_READ_DATABASE');
    const port = this.defined('DB_READ_PORT');

    const readableUrl = `postgres://${user}:${password}@${host}:${port}/${database}`;

    const writeUser = this.optional('DB_WRITE_USER');
    const writePassword = this.optional('DB_WRITE_PASSWORD');
    const writeHost = this.optional('DB_WRITE_HOST');
    const writeDatabase = this.optional('DB_WRITE_DATABASE');
    const writePort = this.optional('DB_WRITE_PORT');

    // prettier-ignore
    const writeUrlCanBeUsed = writeUser && writePassword && writeHost && writeDatabase && writePort;

    if (this.production && !writeUrlCanBeUsed) {
      console.warn('Writable database URL is not defined. Using read-only database URL.');
    }

    const writableUrl = writeUrlCanBeUsed
      ? `postgres://${writeUser}:${writePassword}@${writeHost}/${writeDatabase}`
      : readableUrl;

    return { readableUrl, writableUrl };
  }

  public session() {
    const sessionSecret = this.defined('SESSION_SECRET');

    return {
      sessionName: process.env.SESSION_NAME ?? 'metronome',
      sessionSecret,
    };
  }

  public app() {
    const appUrl = this.defined('APP_URL');
    const port = Number(this.defined('APP_PORT'));

    return { url: appUrl, port };
  }

  public url(pathname: string) {
    const { url: appUrl, port } = this.app();

    const normalizedAppUrl = appUrl.endsWith('/') ? appUrl.slice(0, -1) : appUrl;
    const normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;

    return this.when({
      production: () => `${normalizedAppUrl}${normalizedPathname}`,
      development: () => `${normalizedAppUrl}:${port}${normalizedPathname}`,
    });
  }

  public producer() {
    return {
      apiKey: this.optional('PRODUCER_PROJECT_API_KEY'),
      url: this.optional('PRODUCER_URL'),
    };
  }

  /**
   * Redis queue configuration
   * @returns {Object}
   */
  public queues() {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const url = this.defined('REDIS_QUEUE_URL');

    const password = this.production
      ? this.defined('REDIS_QUEUE_PASSWORD')
      : this.optional('REDIS_QUEUE_PASSWORD');

    const family = Number(this.optional('REDIS_QUEUE_FAMILY', '4'));

    return { url, password, family };
  }

  public cache({ unique }: { unique: boolean } | undefined = { unique: false }) {
    if (unique) {
      const url = this.defined('REDIS_UNIQUE_URL');

      const password = this.production
        ? this.defined('REDIS_UNIQUE_PASSWORD')
        : this.optional('REDIS_UNIQUE_PASSWORD');

      const family = Number(this.optional('REDIS_UNIQUE_FAMILY', '4'));

      return { url, password, family };
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const url = this.defined('REDIS_CACHE_URL');

    const password = this.production
      ? this.defined('REDIS_CACHE_PASSWORD')
      : this.optional('REDIS_CACHE_PASSWORD');

    const family = Number(this.optional('REDIS_CACHE_FAMILY', '4'));

    return { url, password, family };
  }

  /**
   * Returns the value of the environment variable based on the current environment.
   * @param environment
   * @returns
   */
  public when<T>(environment: {
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

    if (this.production) {
      return castProduction();
    }

    if (this.test) {
      return castTest() || castProduction();
    }

    return typeof environment.development !== undefined ? castDevelopment()! : castProduction();
  }

  public geoip() {
    const licenseKey = this.optional('MAXMIND_LICENSE_KEY');

    return { licenseKey };
  }
}

export const env = new Environment();
