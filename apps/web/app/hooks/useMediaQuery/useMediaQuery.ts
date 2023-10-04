import { useEffect, useRef } from 'react';

const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

export function useMediaQuery(
  mediaQuery: string | keyof typeof breakpoints,
  callback: (matches: boolean) => void
): boolean {
  const query = breakpoints[mediaQuery as keyof typeof breakpoints] ?? mediaQuery;

  const mediaQueryList = useRef<MediaQueryList | null>(
    typeof window !== 'undefined' ? window.matchMedia(query) : null
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      callback(event.matches);
    };

    callback(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query, callback]);

  return mediaQueryList.current?.matches ?? false;
}
