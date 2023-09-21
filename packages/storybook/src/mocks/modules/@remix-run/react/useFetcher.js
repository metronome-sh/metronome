import { useFetcher as useFetcherPrimitive } from '../../../../../node_modules/@remix-run/react/dist/index.js';
import { useContext } from 'react';
import { MockContext } from '../../../../MockContext.js';
import { action } from '@storybook/addon-actions';

export function useFetcher() {
  const { fetcher = {} } = useContext(MockContext);
  const fetcherPrimitive = useFetcherPrimitive();

  const submit = (data, options) => {
    action('submit')({ data, options });
  };

  return { ...fetcherPrimitive, ...fetcher, submit };
}
