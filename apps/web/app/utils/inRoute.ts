import { match } from 'path-to-regexp';

export function inRoute(
  request: Request,
  routePatterns: string | string[],
): boolean {
  const url = new URL(request.url);
  const currentPath = url.pathname;
  const patterns = Array.isArray(routePatterns)
    ? routePatterns
    : [routePatterns];

  return patterns.some((pattern) => {
    const routeMatch = match(pattern, { decode: decodeURIComponent });
    return routeMatch(currentPath) !== false;
  });
}
