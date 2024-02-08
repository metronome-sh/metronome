import { useEventRouteData } from '#app/hooks/useEventRouteData';

import { type loader } from '../$teamSlug.$projectSlug.route';

export function useTeamProjectEventData() {
  return useEventRouteData<typeof loader>('$teamSlug.$projectSlug');
}
