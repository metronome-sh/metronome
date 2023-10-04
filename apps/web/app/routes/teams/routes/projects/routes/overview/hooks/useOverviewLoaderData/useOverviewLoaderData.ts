import { SerializeFrom } from '@remix-run/node';
import { useRouteLoaderData } from '@remix-run/react';
import { invariant } from 'ts-invariant';

import { type loader } from '../../$teamSlug.$projectSlug.overview.route';

export function useOverviewLoaderData(): SerializeFrom<typeof loader> {
  const data = useRouteLoaderData<typeof loader>(
    '$teamSlug.$projectSlug.overview',
  );
  invariant(
    data,
    `Route loader data for route $teamSlug.$projectSlug.overview is undefined.`,
  );
  return data;
}
