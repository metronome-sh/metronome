import { useNavigation as useNavigationPrimitive } from '../../../../../node_modules/@remix-run/react/dist/index.js';
import { useContext, useEffect, useState } from 'react';
import { MockContext } from '../../../MockContext';

export function useNavigation() {
  const { navigation } = useContext(MockContext);

  const [navigationState, setNavigationState] = useState(
    Array.isArray(navigation) ? navigation[0] : navigation,
  );

  useEffect(() => {
    if (Array.isArray(navigation)) {
      setNavigationState(navigation[1]);
    }
  }, [navigation]);

  const navigationPrimitive = useNavigationPrimitive();
  return { ...navigationPrimitive, ...navigationState };
}
