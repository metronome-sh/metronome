import { useEventRouteData } from '#app/hooks';

import { type loader } from '../shared.$projectId.route';

export function useSharedProjectEventData() {
  return useEventRouteData<typeof loader>('shared.$projectId');
}
