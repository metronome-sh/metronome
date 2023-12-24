import { SerializeFrom } from '@remix-run/node';
import { useRouteLoaderData } from '@remix-run/react';
import { invariant } from 'ts-invariant';

import { type loader } from '../shared.$projectId.route';

export function useSharedProjectLoaderData(): SerializeFrom<typeof loader> {
  const data = useRouteLoaderData<typeof loader>('shared.$projectId');
  invariant(data, `Route loader data for route shared.$projectId is undefined.`);
  return data;
}
