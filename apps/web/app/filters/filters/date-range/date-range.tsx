import { z } from 'zod';

import { Icon, Ping } from '#app/components';
import { type FilterObject } from '#app/filters/filters.types';

import { CustomDateRange } from './components/CustomDateRange';
import { CustomDateRangeLabel } from './components/CustomDateRangeLabel';
import { server } from './date-range.server';
import {
  type DateRangeOptionIds,
  type DateRangeParsed,
} from './date-range.types';
import { areDatesInRange, isDifferenceGreaterThanDays } from './helpers';

export const dateRange = {
  filterId: 'date-range',
  label: 'Date range',
  icon: Icon.Calendar,
  server,
  initial: 'today',
  options: [
    {
      optionId: 'today',
      label: (active) => (
        <span className="flex gap-2 items-center">
          Today
          {active ? <Ping className="h-2 w-2" /> : null}
        </span>
      ),
      value: () => ['today'],
      dependencies: {
        interval: () => z.tuple([z.literal('hourly')]),
      },
    },
    {
      optionId: 'yesterday',
      label: () => 'Yesterday',
      value: () => ['yesterday'],
      dependencies: {
        interval: () => z.tuple([z.literal('hourly')]),
      },
    },
    {
      optionId: 'this-week',
      label: () => 'This week',
      value: () => ['this-week'],
      dependencies: {
        interval: () => {
          return z.union([
            z.tuple([z.literal('hourly')]),
            z.tuple([z.literal('daily')]),
          ]);
        },
      },
    },
    {
      optionId: 'last-seven-days',
      label: () => 'Last 7 days',
      value: () => ['last-seven-days'],
      dependencies: {
        interval: () => {
          return z.union([
            z.tuple([z.literal('hourly')]),
            z.tuple([z.literal('daily')]),
          ]);
        },
      },
    },
    {
      optionId: 'last-thirty-days',
      label: () => 'Last 30 days',
      value: () => ['last-thirty-days'],
      dependencies: {
        interval: () => z.tuple([z.literal('daily')]),
      },
    },
    {
      optionId: 'this-month',
      label: () => 'This month',
      value: () => ['this-month'],
      dependencies: {
        interval: () => z.tuple([z.enum(['daily', 'weekly'])]),
      },
    },
    {
      optionId: 'last-month',
      label: () => 'Last month',
      value: () => ['last-month'],
      dependencies: {
        interval: () => z.tuple([z.enum(['daily', 'weekly'])]),
      },
    },
    {
      optionId: 'this-year',
      label: () => 'This year',
      value: () => ['this-year'],
      dependencies: {
        interval: () => z.tuple([z.literal('monthly')]),
      },
    },
  ],
  custom: {
    description: 'Custom date range',
    component: CustomDateRange,
    label: CustomDateRangeLabel,
    validate: () =>
      z.union([
        z.tuple([z.string().datetime()]),
        z.tuple([z.string().datetime(), z.string().datetime()]),
      ]),
    dependencies: {
      interval: (selfValue, [dependencyValue]) => {
        // Prevent empty values to be evaluated
        if (selfValue.length === 0) return true;

        const [fromString, toString] = selfValue;

        if (!toString || fromString === toString)
          return dependencyValue === 'hourly';

        const from = new Date(fromString);
        const to = new Date(toString);

        // Check if from and to are the same day
        if (from.toDateString() === to.toDateString())
          return dependencyValue === 'hourly';

        if (dependencyValue === 'hourly')
          return areDatesInRange(from, to, 1, 7);

        if (dependencyValue === 'daily')
          return areDatesInRange(from, to, 7, 31);

        if (dependencyValue === 'weekly')
          return areDatesInRange(from, to, 31, 365);

        if (dependencyValue === 'monthly')
          return isDifferenceGreaterThanDays(from, to, 365);

        return false;
      },
    },
  },
} satisfies FilterObject<DateRangeOptionIds, DateRangeParsed>;
