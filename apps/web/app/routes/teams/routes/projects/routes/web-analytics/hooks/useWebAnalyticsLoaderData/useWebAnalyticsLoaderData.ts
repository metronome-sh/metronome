import { SerializeFrom } from '@remix-run/node';
import { useRouteLoaderData } from '@remix-run/react';
import { invariant } from 'ts-invariant';

import { type loader } from '../../$teamSlug.$projectSlug.web-analytics.route';

export function useWebAnalyticsLoaderData(): SerializeFrom<typeof loader> {
  const data = useRouteLoaderData<typeof loader>('$teamSlug.$projectSlug.web-analytics');
  invariant(data, `Route loader data for route $teamSlug.$projectSlug.web-analytics is undefined.`);
  return data;
}
