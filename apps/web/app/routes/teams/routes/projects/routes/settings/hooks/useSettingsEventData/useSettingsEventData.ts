import { useEventRouteData } from '#app/hooks';

import { type loader } from '../../$teamSlug.$projectSlug.settings.route';

export function useSettingsEventData() {
  return useEventRouteData<typeof loader>('$teamSlug.$projectSlug.settings');
}
