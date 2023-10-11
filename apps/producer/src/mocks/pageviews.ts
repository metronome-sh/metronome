import { faker } from '@faker-js/faker';

import { getRoute } from './utils';

export function generatePageview() {
  return {
    name: 'pageview',
    details: {
      timestamp: Date.now().valueOf(),
      pathname: '/',
      query: '',
      hostname: 'localhost',
      referrer: '',
      screen: '1512x982',
      language: 'en-US',
      connection: '4g',
      deviceCategory: 'desktop',
      version: '7.1.0-next.18',
      adapter: 'express',
      ip: faker.internet.ipv4(),
      ua: faker.internet.userAgent(),
      hash: '446b9c7b',
      routeId: 'root',
      routePath: '',
      ...getRoute(),
    },
  };
}

// {
//   "name": "pageview",
//   "details": {
//     "timestamp": 1696800642305,
//     "pathname": "/",
//     "query": "",
//     "hostname": "localhost",
//     "referrer": "",
//     "screen": "1512x982",
//     "language": "en-US",
//     "connection": "4g",
//     "deviceCategory": "desktop",
//     "version": "7.1.0-next.18",
//     "adapter": "express",
//     "ip": "::1",
//     "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
//     "hash": "446b9c7b",
//     "routeId": "root",
//     "routePath": ""
//   }
// }
