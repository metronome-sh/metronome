import { Temporal } from '@js-temporal/polyfill';

export function getTimeZoneFromRequest(request: Request): Temporal.TimeZone {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return Temporal.TimeZone.from('UTC') as Temporal.TimeZone;
  }

  const regexp = new RegExp('(^| )timeZone=([^;]+)');
  const timeZone = (cookie.match(regexp) || [])[2];

  if (!timeZone) {
    return Temporal.TimeZone.from('UTC') as Temporal.TimeZone;
  }

  let temporalTimezone: Temporal.TimeZone;

  // Handle edge cases where the timezone is not valid
  // Like Etc/Unknown
  try {
    temporalTimezone = Temporal.TimeZone.from(timeZone) as Temporal.TimeZone;
  } catch (error) {
    temporalTimezone = Temporal.TimeZone.from('UTC') as Temporal.TimeZone;
  }

  return temporalTimezone;
}
