import { SerializeFrom } from '@remix-run/node';
import { useMatches, useRouteLoaderData } from '@remix-run/react';
import { invariant } from 'ts-invariant';

import { type loader } from '../../docs.$.route';

export function useDocsLoaderData(): SerializeFrom<typeof loader> {
  const matches = useMatches();

  console.log({ matches });

  const data = useRouteLoaderData<typeof loader>('docs.$');
  invariant(data, `Route loader data for route docs.$ is undefined.`);
  return data;
}
