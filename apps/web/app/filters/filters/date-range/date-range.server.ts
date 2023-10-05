import { Temporal } from '@js-temporal/polyfill';

import { type ServerFilterProps } from '#app/filters/filters.types';
import { getTimeZoneFromRequest } from '#app/utils/timeZone';

import { type DateRangeParsed } from './date-range.types';

export const server = {
  parse: async (activeOption, request) => {
    const timeZone = getTimeZoneFromRequest(request);

    if (!activeOption.isCustom) {
      const [value] = activeOption.value;

      const now = Temporal.Now.instant().toZonedDateTimeISO(timeZone);

      if (value === 'today') {
        return {
          from: now.withPlainTime('00:00:00'),
          to: now.withPlainTime('23:59:59'),
        };
      }

      if (value === 'yesterday') {
        const yesterday = now.subtract({ days: 1 });

        return {
          from: yesterday.withPlainTime('00:00:00'),
          to: yesterday.withPlainTime('23:59:59'),
        };
      }

      if (value === 'this-week') {
        const monday = now
          .withPlainTime('00:00:00')
          .subtract({ days: now.dayOfWeek - 1 });
        const sunday = monday.add({ days: 7 }).withPlainTime('23:59:59');

        return {
          from: monday,
          to: sunday,
        };
      }

      if (value === 'last-seven-days') {
        const sevenDaysAgo = now
          .withPlainTime('00:00:00')
          .subtract({ days: 6 });

        return {
          from: sevenDaysAgo,
          to: now.withPlainTime('23:59:59'),
        };
      }

      if (value === 'last-thirty-days') {
        const thirtyDaysAgo = now
          .withPlainTime('00:00:00')
          .subtract({ days: 29 });

        return {
          from: thirtyDaysAgo,
          to: now.withPlainTime('23:59:59'),
        };
      }

      if (value === 'this-month') {
        const firstDayOfMonth = now.withPlainTime('00:00:00').with({ day: 1 });

        return {
          from: firstDayOfMonth,
          to: now.withPlainTime('23:59:59'),
        };
      }

      if (value === 'last-month') {
        const firstDayOfLastMonth = now
          .withPlainTime('00:00:00')
          .with({ day: 1 })
          .subtract({ months: 1 });
        const lastDayOfLastMonth = firstDayOfLastMonth
          .add({ months: 1 })
          .subtract({ days: 1 });

        return {
          from: firstDayOfLastMonth,
          to: lastDayOfLastMonth,
        };
      }

      if (value === 'this-year') {
        const firstDayOfYear = now
          .withPlainTime('00:00:00')
          .with({ month: 1, day: 1 });

        return {
          from: firstDayOfYear,
          to: now.withPlainTime('23:59:59'),
        };
      }

      throw new Error('Unsupported date range');
    }

    // eslint-disable-next-line prefer-const
    let [fromString, toString] = activeOption.value as [string, string];

    if (!toString) {
      toString = fromString;
    }

    const from = Temporal.Instant.fromEpochMilliseconds(
      new Date(fromString).valueOf(),
    ).toZonedDateTimeISO(timeZone);

    const to = Temporal.Instant.fromEpochMilliseconds(
      new Date(toString).valueOf(),
    ).toZonedDateTimeISO(timeZone);

    const comparison = Temporal.ZonedDateTime.compare(from, to);

    // Always return the range in the correct order
    return {
      from: (comparison < 0 ? from : to).withPlainTime('00:00:00'),
      to: (comparison < 0 ? to : from).withPlainTime('23:59:59'),
    } as unknown as DateRangeParsed;
  },
} satisfies ServerFilterProps<DateRangeParsed>;
