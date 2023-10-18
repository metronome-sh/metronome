import { Reader, ReaderModel } from '@maxmind/geoip2-node';
import { env } from '@metronome/env.server';
import fs from 'fs';
import path from 'path';

const resolvedUnknown = {
  countryCode: 'unknown',
  country: 'unknown',
  region: 'unknown',
  city: 'unknown',
};

let reader: ReaderModel;

function initReader() {
  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { database } = require(path.join(__dirname, '../../geoip/manifest.json'));

  const databaseDir = database;

  const dbBuffer = fs.readFileSync(databaseDir);
  reader = Reader.openBuffer(dbBuffer);
}

export function resolveIp(ip: string): {
  countryCode: string;
  country: string;
  region: string;
  city: string;
} {
  try {
    if (!reader) initReader();
  } catch (error) {
    console.warn('Could not find GeoIP database');
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
      console.warn(
        `Could not resolve IP address ${ip}: `,
        (error as Error)?.name,
      );
    }
    return resolvedUnknown;
  }
}
