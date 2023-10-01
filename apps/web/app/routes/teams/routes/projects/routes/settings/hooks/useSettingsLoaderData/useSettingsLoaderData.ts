import { SerializeFrom } from '@remix-run/node';
import { useRouteLoaderData } from '@remix-run/react';
import { invariant } from 'ts-invariant';

import { type loader } from '../../$teamSlug.$projectSlug.settings.route';

export function useSettingsLoaderData(): SerializeFrom<typeof loader> {
  const data = useRouteLoaderData<typeof loader>(
    '$teamSlug.$projectSlug.settings',
  );
  invariant(
    data,
    `Route loader data for route $teamSlug.$projectSlug.settings is undefined.`,
  );
  return data;
}
