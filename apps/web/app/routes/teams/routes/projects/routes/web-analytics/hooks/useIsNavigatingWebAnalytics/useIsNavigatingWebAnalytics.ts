import { useIsNavigating } from '#app/hooks';

export function useIsNavigatingWebAnalytics() {
  return useIsNavigating('$teamSlug.$projectSlug.web-analytics');
}
