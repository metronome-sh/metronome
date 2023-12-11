import { Reader, ReaderModel } from '@maxmind/geoip2-node';
import { env } from '@metronome/env.server';
import { execa } from 'execa';
import fs from 'fs';
import path from 'path';

const DB_CHECK_INTERVAL = env.when({
  production: 86_400_000, // 1 day
  development: 60_000, // 1 minute
});

const resolvedUnknown = {
  countryCode: 'unknown',
  country: 'unknown',
  region: 'unknown',
  city: 'unknown',
};

let readerInstance: ReaderModel;
let dbLastChecked = 0;
let noMaxmindEnvMessageShown = false;

async function getReader(): Promise<ReaderModel> {
  if (env.geoip().licenseKey === undefined) {
    if (!noMaxmindEnvMessageShown) {
      console.warn(
        'No MAXMIND_LICENSE_KEY environment variable found. Please set it to download the GeoIP database.',
      );
      noMaxmindEnvMessageShown = true;
    }

    throw new Error('MAXMIND_LICENSE_KEY');
  }

  const now = new Date().getTime();

  if (readerInstance && now - dbLastChecked < DB_CHECK_INTERVAL) {
    return readerInstance;
  }

  const { stdout } = await execa('pnpm', ['run', 'geoip:download'], {
    cwd: path.join(__dirname, '../../'),
  });

  console.log(stdout);

  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { database } = require(path.join(__dirname, '../../geoip/manifest.json'));

  const databaseDir = database;

  const dbBuffer = fs.readFileSync(databaseDir);
  readerInstance = Reader.openBuffer(dbBuffer);

  dbLastChecked = now;

  return readerInstance;
}

export async function resolveIp(ip: string): Promise<{
  countryCode: string;
  country: string;
  region: string;
  city: string;
}> {
  let reader: ReaderModel;

  try {
    reader = await getReader();
  } catch (error) {
    if ((error as Error).message !== 'MAXMIND_LICENSE_KEY') {
      console.warn('Could not find GeoIP database: ', (error as Error).message);
    }

    return resolvedUnknown;
  }

  try {
    const resolved = env.when({
      production: () => reader.city(ip),
      development: () => {
        // prettier-ignore
        const devIp = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
        return reader.city(devIp);
      },
    });

    const countryCode = resolved.country?.isoCode ?? 'unknown';
    const country = resolved.country?.names?.en ?? 'unknown';
    const region = resolved.subdivisions?.[0]?.names?.en ?? 'unknown';
    const city = resolved.city?.names?.en ?? 'unknown';

    return { countryCode, country, region, city };
  } catch (error) {
    if (env.production) {
      console.warn(`Could not resolve IP address ${ip}: `, (error as Error)?.name);
    }
    return resolvedUnknown;
  }
}
