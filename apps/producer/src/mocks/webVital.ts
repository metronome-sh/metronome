import { faker } from '@faker-js/faker';
import {
  CLSThresholds,
  FCPThresholds,
  FIDThresholds,
  INPThresholds,
  LCPThresholds,
  TTFBThresholds,
} from 'web-vitals';

import { getRoute } from './utils';

export function generateWebVital(
  vital: 'fcp' | 'lcp' | 'cls' | 'fid' | 'ttfb' | 'inp',
) {
  const navigationType = faker.helpers.arrayElement([
    'navigate',
    'reload',
    'back-forward',
    'back-forward-cache',
    'prerender',
    'restore',
  ]);

  const deviceCategory = faker.helpers.arrayElement([
    'desktop',
    'mobile',
    'tablet',
  ]);

  const connection = faker.helpers.arrayElement(['unknown', '4g']);

  const screen = faker.helpers.arrayElement([
    '1920x1080',
    '1512x982',
    '1366x768',
    '1280x800',
    '1024x768',
    '360x640',
    '375x812',
    '414x896',
  ]);

  const { value, rating } = (function () {
    let max = 0;
    let min = 0;

    switch (vital) {
      case 'fcp':
        max = 3000;
        min = 0;
        break;
      case 'lcp':
        max = 5000;
        min = 0;
        break;
      case 'cls':
        max = 0.5;
        min = 0;
        break;
      case 'fid':
        max = 500;
        min = 0;
        break;
      case 'ttfb':
        max = 3000;
        min = 0;
        break;
      case 'inp':
        max = 1000;
        min = 0;
        break;
    }

    const thresholds = {
      fcp: FCPThresholds,
      lcp: LCPThresholds,
      cls: CLSThresholds,
      fid: FIDThresholds,
      ttfb: TTFBThresholds,
      inp: INPThresholds,
    };

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const value = faker.number.float({ min, max });

    const [median, p10] = thresholds[vital];

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const rating =
      value <= median ? 'good' : value <= p10 ? 'needs-improvement' : 'poor';

    return { value, rating };
  })();

  return {
    name: 'web-vital',
    details: {
      timestamp: Date.now().valueOf(),
      metric: {
        id: 'v3-1696606509120-2075740163863',
        name: vital.toUpperCase(),
        value,
        rating,
        navigationType,
      },
      query: '',
      hostname: 'localhost',
      referrer: '',
      screen,
      language: 'en-US',
      connection,
      deviceCategory,
      version: '7.1.0-next.18',
      adapter: 'express',
      ip: faker.internet.ipv4(),
      ua: faker.internet.userAgent(),
      hash: '446b9c7b',
      ...getRoute(),
    },
  };
}
