import { Temporal } from '@js-temporal/polyfill';

export function offsetToTemporalTimeZone(offsetMinutesString: string) {
  // Convert the string to a number
  const offsetMinutes = parseInt(offsetMinutesString, 10);

  // Correct the offset sign
  const correctedOffsetMinutes = -offsetMinutes;

  // Convert the offset to hours and minutes
  const offsetHours = Math.floor(correctedOffsetMinutes / 60);
  const offsetRemainderMinutes = correctedOffsetMinutes % 60;

  const offsetHoursString = Math.abs(offsetHours).toString().padStart(2, '0');
  const offsetRemainderMinutesString = offsetRemainderMinutes
    .toString()
    .padStart(2, '0');

  // Create a Temporal-compatible offset string
  // prettier-ignore
  const offsetString = `${offsetHours >= 0 ? '+' : '-'}${offsetHoursString}:${offsetRemainderMinutesString}`;

  // Create and return a Temporal.TimeZone object
  return Temporal.TimeZone.from(offsetString);
}
