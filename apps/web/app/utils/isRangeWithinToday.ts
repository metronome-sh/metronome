import { Temporal } from '@js-temporal/polyfill';

export function isRangeWithinToday(range: {
  from: Temporal.ZonedDateTime;
  to: Temporal.ZonedDateTime;
}): boolean {
  const from = range.from.withPlainTime('00:00:00');
  const to = range.to.withPlainTime('00:00:00');
  const now = Temporal.Now.zonedDateTimeISO(
    range.from.timeZoneId,
  ).withPlainTime('00:00:00');

  return (
    from.epochSeconds === to.epochSeconds &&
    from.epochSeconds === now.epochSeconds
  );
}
