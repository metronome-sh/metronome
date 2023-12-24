import { useIsNavigating } from '#app/hooks';

export function useIsNavigatingSharedProject() {
  return useIsNavigating('shared.$projectId');
}
