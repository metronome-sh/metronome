import { useContext } from 'react';
import { invariant } from 'ts-invariant';

import { filtersContext } from '#app/filters/filtersContext';

export function useFiltersContext() {
  const context = useContext(filtersContext);

  invariant(context, 'useFiltersContext must be used within a FiltersProvider');

  return context;
}
