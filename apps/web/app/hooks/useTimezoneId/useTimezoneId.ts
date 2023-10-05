import { useRootLoaderData } from '..';

export function useTimezoneId() {
  const { timeZoneId } = useRootLoaderData();
  return timeZoneId;
}
