import { useSearchParams } from '@remix-run/react';
import { useMemo } from 'react';

import {
  type ActiveFilterOption,
  type FilterObject,
} from '#app/filters/filters.types';
import { mergeFilterOptionsWithSearch } from '#app/filters/helpers';

export function useFilterActiveOption<T extends string>(
  filter: FilterObject<T, unknown>,
) {
  const [search] = useSearchParams();
  const [activeOption] = useMemo(
    () => mergeFilterOptionsWithSearch(search, [filter]),
    [filter, search],
  );
  return activeOption as ActiveFilterOption<T>;
}
