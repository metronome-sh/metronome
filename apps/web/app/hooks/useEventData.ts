import { useMatches } from '@remix-run/react';
import { invariant } from 'ts-invariant';

import { useEventRouteData } from './useEventRouteData';

export function useEventData() {
  const matches = useMatches();
  const route = matches.at(-1);

  invariant(route, `route is undefined.`);

  const data = useEventRouteData(route.id);

  return data;
}
