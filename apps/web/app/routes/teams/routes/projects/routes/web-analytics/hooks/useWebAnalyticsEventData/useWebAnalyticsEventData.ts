import { useEventRouteData } from '#app/hooks';

import { type loader } from '../../$teamSlug.$projectSlug.web-analytics.route';

export function useWebAnalyticsEventData() {
  return useEventRouteData<typeof loader>(
    '$teamSlug.$projectSlug.web-analytics',
  );
}
