import { useNavigation } from '@remix-run/react';
import { pathToRegexp } from 'path-to-regexp';
import { useMemo } from 'react';

import { usePrevious } from '../usePrevious';

export function useIsNavigating(routeId: string) {
  const navigation = useNavigation();

  const previousKey = usePrevious(navigation.location?.key, true);

  const isNavigating = useMemo(() => {
    if (navigation?.location?.key === previousKey && navigation.state == 'idle')
      return false;

    const path = '/' + routeId.replace(/\$/g, ':').replace(/\./g, '/');
    const pathRegexp = pathToRegexp(path);

    return pathRegexp.test(navigation.location?.pathname ?? '');
  }, [
    navigation.location?.key,
    navigation.location?.pathname,
    navigation.state,
    previousKey,
    routeId,
  ]);

  return isNavigating;
}
