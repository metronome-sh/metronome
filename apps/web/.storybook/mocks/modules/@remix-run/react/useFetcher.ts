import { useFetcher as useFetcherPrimitive } from '../../../../../node_modules/@remix-run/react';
import { useContext } from 'react';
import { MockContext } from '../../../MockContext';
import { action } from '@storybook/addon-actions';

export function useFetcher() {
  const { fetcher = {} } = useContext(MockContext);
  const fetcherPrimitive = useFetcherPrimitive();

  const submit = (data: any, options) => {
    action('submit')({ data, options });
  };

  return { ...fetcherPrimitive, ...fetcher, submit };
}
