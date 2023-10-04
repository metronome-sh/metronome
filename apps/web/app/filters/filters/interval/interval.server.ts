import { type ServerFilterProps } from '#app/filters/filters.types';

import { type IntervalParsed } from './interval.types';

export const server = {
  parse: (activeOption) => {
    const [value] = activeOption.value;

    switch (value) {
      case 'hourly':
        return 'hour';
      case 'daily':
        return 'day';
      case 'weekly':
        return 'week';
      case 'monthly':
        return 'month';
      default:
        throw new Error('Invalid interval');
    }
  },
} satisfies ServerFilterProps<IntervalParsed>;
