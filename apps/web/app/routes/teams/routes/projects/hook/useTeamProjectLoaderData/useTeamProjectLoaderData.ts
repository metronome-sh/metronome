import { SerializeFrom } from '@remix-run/node';
import { useRouteLoaderData } from '@remix-run/react';
import { invariant } from 'ts-invariant';

import { loader } from '../../$teamSlug.$projectSlug.route';

export function useTeamProjectLoaderData(): SerializeFrom<typeof loader> {
  const data = useRouteLoaderData<typeof loader>('$teamSlug.$projectSlug');
  invariant(data, `Route loader data for route $teamSlug is undefined.`);
  return data;
}
