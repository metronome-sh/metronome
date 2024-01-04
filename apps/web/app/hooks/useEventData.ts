import { useMatches } from '@remix-run/react';

export function useEventData() {
  const matches = useMatches();

  console.log({ matches });
}
