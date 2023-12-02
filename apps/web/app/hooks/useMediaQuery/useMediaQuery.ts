import { useEffect, useRef } from 'react';

const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
} as const;

type Breakpoint = keyof typeof breakpoints;

export function useMediaQuery(
  mediaQuery: string | { size: Breakpoint },
  callback?: (matches: boolean) => void,
): boolean {
  const query = typeof mediaQuery === 'string' ? mediaQuery : breakpoints[mediaQuery.size];

  const mediaQueryList = useRef<MediaQueryList | null>(
    typeof window !== 'undefined' ? window.matchMedia(query) : null,
  );

  useEffect(() => {
    const mqList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      callback?.(event.matches);
    };

    callback?.(mqList.matches);

    mqList.addEventListener('change', handleChange);

    return () => {
      mqList.removeEventListener('change', handleChange);
    };
  }, [query, callback]);

  return mediaQueryList.current?.matches ?? false;
}
