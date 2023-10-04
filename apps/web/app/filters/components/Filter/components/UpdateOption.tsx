import { FunctionComponent } from 'react';

import { Icon } from '#app/components';
import { ActiveFilterOption } from '#app/filters/filters.types';
import { toMap } from '#app/filters/helpers';
import { useFiltersContext } from '#app/filters/hooks';

export const UpdateOption: FunctionComponent<{
  option: ActiveFilterOption;
}> = ({ option }) => {
  const { filters } = useFiltersContext();

  const filter = toMap(filters)[option.filterId];

  const IconComponent = filter?.icon ?? Icon.Filter;

  return (
    <div className="border border-dashed text-yellow-400 border-yellow-400/40 rounded-sm flex items-center gap-1 pl-0.5 pr-1 py-0.5 w-fit">
      <span className="pl-0.5 pb-0.5">
        <IconComponent />
      </span>
      <span className="text-xs">{option.label}</span>
    </div>
  );
};
