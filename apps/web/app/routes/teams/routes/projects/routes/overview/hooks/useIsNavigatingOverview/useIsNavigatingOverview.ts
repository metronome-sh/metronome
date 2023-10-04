import { useIsNavigating } from '#app/hooks';

export function useIsNavigatingOverview() {
  return useIsNavigating('$teamSlug.$projectSlug.overview');
}
