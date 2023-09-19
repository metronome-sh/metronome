import { Project, User } from '@metronome/db.server';
import { faker } from '@faker-js/faker';
import { Temporal } from '@js-temporal/polyfill';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function replacePlaceholdersWithRandomIds(route: string) {
  const updatedRoute = route.replace(/:(\w+)(?=\/|$)/g, `${getRandomInt(1000, 4000)}`);
  return updatedRoute;
}

function generateCountryData() {
  const countries = [
    'Canada',
    'United States',
    'Mexico',
    'Brazil',
    'Argentina',
    'United Kingdom',
    'France',
    'Germany',
    'China',
    'India',
    'Australia',
    'South Africa',
    'Egypt',
    'Nigeria',
    'Japan',
    'South Korea',
    'UAE',
    'Turkey',
  ];

  const countryCodes = [
    'CA',
    'US',
    'MX',
    'BR',
    'AR',
    'GB',
    'FR',
    'DE',
    'CN',
    'IN',
    'AU',
    'ZA',
    'EG',
    'NG',
    'JP',
    'KR',
    'AE',
    'TR',
  ];

  return countries
    .map((country, index) => ({
      code: countryCodes[index],
      country,
      count: getRandomInt(50, 2000),
    }))
    .sort((a, b) => b.count - a.count);
}

function generateRegionData() {
  const regions = [
    'Alberta',
    'California',
    'Quebec',
    'New York',
    'Texas',
    'Bavaria',
    'Île-de-France',
    'Moscow',
    'Beijing',
    'New South Wales',
  ];

  const countryCodes = ['CA', 'US', 'CA', 'US', 'US', 'DE', 'FR', 'RU', 'CN', 'AU'];

  return regions
    .map((region, index) => ({
      code: countryCodes[index],
      region,
      count: getRandomInt(20, 200),
    }))
    .sort((a, b) => b.count - a.count);
}

function generateCityData() {
  const cities = [
    'Calgary',
    'San Francisco',
    'Montreal',
    'New York City',
    'Houston',
    'Munich',
    'Paris',
    'Beijing City',
    'Sydney',
  ];

  const countryCodes = ['CA', 'US', 'CA', 'US', 'US', 'DE', 'FR', 'CN', 'AU'];

  return cities
    .map((city, index) => ({
      code: countryCodes[index],
      city,
      count: getRandomInt(10, 100),
    }))
    .sort((a, b) => b.count - a.count);
}

function generateSeries(cb: () => Record<string, any>) {
  return {
    series: Array.from({ length: 24 }, (_, i) => {
      const timestamp = Temporal.Now.zonedDateTimeISO(timeZoneWithOffset.timeZone)
        .withPlainTime('00:00:00')
        .add({ hours: i })
        .toInstant().epochMilliseconds;

      return { timestamp, ...cb() };
    }),
  };
}

export const timeZoneWithOffset = {
  timeZone: Temporal.Now.zonedDateTimeISO().timeZoneId,
  offset: '-06:00',
};

export const user: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  picture: 'https://avatar.vercel.sh/personal.png',
  createdAt: new Date(),
  updatedAt: new Date(),
  selectedEmail: 'john@example.cwom',
  settings: {},
  strategy: 'github',
};

export const project: Project = {
  id: '1',
  name: 'Project 1',
  createdAt: new Date(),
  updatedAt: new Date(),
  description: 'My Project Description',
  url: 'https://remix.run',
  apiKey: '123',
  createdById: '1',
  clientVersion: '1.0.0',
  costLimit: 100,
  deleted: false,
  isNew: false,
  metadata: {},
  organizationId: '1',
  previousSalt: '123',
  salt: '456',
  visibility: 'PUBLIC',
};

// Just change project id and name 4 times
export const projects: Project[] = Array.from({ length: 4 }, (_, i) => ({
  ...project,
  id: `${i}`,
  name: `${faker.word.adverb()} ${faker.word.adjective()} ${faker.word.adjective()} ${faker.word.noun()}`,
}));

export const emails = ['foo@example.com', 'bar@example.com'];

export const usage = '999999999';

export const visitorsRightNow = { visitorsRightNow: 20 };

export const sessionsOverview = { totalSessions: 999_999, duration: { p50: 10000 } };

export const pageviewsCount = { pageviews: 999_999 };

export const bounceRate = { bounceRate: 0.524 };

export const webVitalsOverview = [
  {
    name: 'LCP',
    scores: { p50: null, p75: 88, p90: null, p95: null, p99: null },
    values: { p50: null, p75: 400, p90: null, p95: null, p99: null },
  },
  {
    name: 'INP',
    scores: { p50: null, p75: 40, p90: null, p95: null, p99: null },
    values: { p50: null, p75: 400, p90: null, p95: null, p99: null },
  },
  {
    name: 'FID',
    scores: { p50: null, p75: 50, p90: null, p95: null, p99: null },
    values: { p50: null, p75: 90, p90: null, p95: null, p99: null },
  },
  {
    name: 'CLS',
    scores: { p50: null, p75: 20, p90: null, p95: null, p99: null },
    values: { p50: null, p75: 0.3, p90: null, p95: null, p99: null },
  },
];

export const requestsOverview = {
  count: 999_999,
  duration: { p50: 400000000 },
  dataCount: 999_999,
  documentCount: 999_999,
};

export const requestsCountSeries = {
  series: Array.from({ length: 24 }, (_, i) => {
    const timestamp = Temporal.Now.zonedDateTimeISO(timeZoneWithOffset.timeZone)
      .withPlainTime('00:00:00')
      .add({ hours: i })
      .toInstant().epochMilliseconds;

    const documentCount = Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 100);
    const dataCount = Math.floor(Math.random() * 200);

    return {
      timestamp,
      documentCount,
      dataCount,
    };
  }),
};

export const loadersOverview = {
  count: 999_999,
  erroredCount: 999_999,
  duration: { p50: 400000000 },
};

export const actionsOverview = {
  count: 999_999,
  erroredCount: 999_999,
  duration: { p50: 400000000 },
};

export const loadersSeries = generateSeries(() => {
  const count = Math.floor(Math.random() * 100);
  const erroredCount = Math.random() < 0.75 ? 0 : Math.floor(Math.random() * 10);
  const okCount = Math.abs(count - erroredCount);
  return { count, erroredCount, okCount };
});

export const actionsSeries = generateSeries(() => {
  const count = Math.floor(Math.random() * 100);
  const erroredCount = Math.random() < 0.75 ? 0 : Math.floor(Math.random() * 10);
  const okCount = Math.abs(count - erroredCount);
  return { count, erroredCount, okCount };
});

export const visitorsSeries = generateSeries(() => ({ count: Math.floor(Math.random() * 100) }));

export const viewsSeries = generateSeries(() => ({ count: Math.floor(Math.random() * 100) }));

export const sessionsSeries = generateSeries(() => ({ count: Math.floor(Math.random() * 100) }));

export const medianSessionTimeSeries = generateSeries(() => ({
  duration: Math.floor(Math.random() * 10000),
}));

export const bounceRateSeries = generateSeries(() => ({
  bounceRate: Math.random(),
}));

export const locationsByCountry = generateCountryData();

export const locationsByRegion = generateRegionData();

export const locationsByCity = generateCityData();

export const routesList = ((numRoutes: number) => {
  const randomSegment = (): string => {
    const segments = [
      'tasks',
      'users',
      'files',
      'comments',
      'projects',
      'teams',
      'notifications',
      'settings',
      'reports',
      'dashboards',
    ];
    return segments[Math.floor(Math.random() * segments.length)];
  };

  // Function to generate a random route with placeholders
  const randomRouteWithPlaceholders = () => {
    const hasId = Math.random() > 0.5;
    const baseSegment = randomSegment();
    const route = hasId ? `/${baseSegment}/:${baseSegment.slice(0, -1)}Id` : `/${baseSegment}`;

    const detailOrAttachments = Math.random() > 0.5 ? 'detail' : 'attachments';
    return hasId ? `${route}/${detailOrAttachments}` : route;
  };

  const routes = Array.from({ length: numRoutes }, randomRouteWithPlaceholders).map((route) => ({
    route,
    count: getRandomInt(10, 2000),
  }));

  return routes.sort((a, b) => b.count - a.count);
})(20);

export const urlsList = routesList.map((route) => ({
  ...route,
  url: replacePlaceholdersWithRandomIds(route.route),
}));

export const sourcesList = (function generateSourceCounts() {
  const sources = [
    { name: 'Google', url: 'https://google.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'Reddit', url: 'https://reddit.com' },
  ];

  const result = [];

  const sourcesLength = sources.length;

  for (let i = 0; i < sourcesLength; i++) {
    const randomSourceIndex = Math.floor(Math.random() * sources.length);
    const randomSource = sources[randomSourceIndex];

    // Removing the selected source from the original list so it won't be picked again
    sources.splice(randomSourceIndex, 1);

    result.push({
      url: randomSource.url,
      source: randomSource.name,
      count: getRandomInt(10, 2000),
    });
  }

  return result.sort((a, b) => b.count - a.count);
})();

export const browsersList = [
  { id: 'chrome', name: 'Chrome', count: 0 },
  { id: 'firefox', name: 'Firefox', count: 0 },
  { id: 'safari', name: 'Safari', count: 0 },
  { id: 'edge', name: 'Edge', count: 0 },
  { id: 'opera', name: 'Opera', count: 0 },
  { id: 'unkwnown', name: 'Unknown', count: 0 },
]
  .map((browser) => ({ ...browser, count: getRandomInt(10, 2000) }))
  .sort((a, b) => b.count - a.count);

export const osList = [
  { id: 'windows', name: 'Windows', count: 0 },
  { id: 'macos', name: 'macOS', count: 0 },
  { id: 'linux', name: 'Linux', count: 0 },
  { id: 'android', name: 'Android', count: 0 },
  { id: 'ios', name: 'iOS', count: 0 },
  { id: 'unkwnown', name: 'Unknown', count: 0 },
]
  .map((os) => ({ ...os, count: getRandomInt(10, 2000) }))
  .sort((a, b) => b.count - a.count);
