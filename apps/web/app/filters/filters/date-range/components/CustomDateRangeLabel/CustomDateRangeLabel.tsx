import { type FunctionComponent } from 'react';

import { type CustomLabelProps } from '#app/filters/filters.types';

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const CustomDateRangeLabel: FunctionComponent<CustomLabelProps> = ({
  value,
}) => {
  const [fromString, toString] = value;

  const from = new Date(fromString);
  const to = toString ? new Date(toString) : undefined;

  const shouldShowTo = to && fromString !== toString;

  return (
    <span className="whitespace-nowrap">
      {formatDate(from)}{' '}
      {shouldShowTo ? <span className="opacity-70 px-1">to</span> : null}{' '}
      {shouldShowTo ? formatDate(to) : null}
    </span>
  );
};
