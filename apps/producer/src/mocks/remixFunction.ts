import { faker } from '@faker-js/faker';

import { getRoute } from './utils';

export function generateRemixFunction(type: 'action' | 'loader') {
  return {
    name: type,
    details: {
      name: type,
      timestamp: Date.now().valueOf(),
      duration: faker.number
        .bigInt({ min: 1_000_000, max: 1_000_000_000 })
        .toString(),
      errored: faker.datatype.boolean({ probability: 0.1 }),
      httpMethod: type === 'action' ? 'POST' : 'GET',
      httpStatusCode: 200,
      httpStatusText: 'Ok',
      version: '7.1.0-next.18',
      adapter: 'express',
      hash: '446b9c7b',
      ip: faker.internet.ipv4(),
      ua: faker.internet.userAgent(),
      startTime: '1794458220825042',
      ...getRoute((route) => {
        const { pathname: httpPathname, ...rest } = route;
        return { ...rest, httpPathname };
      }),
    },
  };
}
