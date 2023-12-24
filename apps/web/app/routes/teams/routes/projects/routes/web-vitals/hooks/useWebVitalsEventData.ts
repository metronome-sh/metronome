import { useEventRouteData } from '#app/hooks';

import { type loader } from '../$teamSlug.$projectSlug.web-vitals.route';

const routeId = '$teamSlug.$projectSlug.web-vitals';

export function useWebVitalsEventData() {
  return useEventRouteData<typeof loader>(routeId);
}
