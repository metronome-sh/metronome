import { faker } from '@faker-js/faker';

export function generateRequest() {
  const statusCode = faker.internet.httpStatusCode();
  const errored = statusCode >= 400;

  const request = {
    name: 'request',
    details: {
      name: 'request',
      adapter: 'express',
      duration: faker.number
        .bigInt({ min: 1_000_000, max: 1_000_000_000_000 })
        .toString(),
      errored,
      method: faker.internet.httpMethod(),
      pathname: '/',
      statusCode,
      version: '7.1.0-next.18',
      hash: '446b9c7b',
      ip: faker.internet.ipv4(),
      ua: faker.internet.userAgent(),
      timestamp: Date.now().valueOf(),
      startTime: '1429881540557041',
      type: faker.helpers.arrayElement(['document', 'data']),
    },
  };

  return request;
}
