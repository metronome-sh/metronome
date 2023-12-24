import { useIsNavigating } from '#app/hooks';

const routeId = '$teamSlug.$projectSlug.web-vitals';

export function useIsNavigatingWebVitals() {
  return useIsNavigating(routeId);
}
