import type { FunctionComponent } from 'react';
import { cn } from '../utils';
import { pathToRegexp, match, Match } from 'path-to-regexp';

export type UrlRouteDisplayProps = {
  url: string;
  route: string;
};

export const UrlRouteDisplay: FunctionComponent<UrlRouteDisplayProps> = ({ route, url }) => {
  const parsed = route.replace(/\*/g, ':splat*');
  const matched = match(parsed)(url);
  let params = matched ? Object.values(matched.params) : [];
  params = [].concat.apply([], params);

  const urlSegments = url.split(/(\/)/).filter(Boolean);
  if (urlSegments[0] !== '/') urlSegments.unshift('/');

  return (
    <span className="font-mono text-sm leading-none">
      {urlSegments.map((urlSegment, index) => {
        return (
          <span
            key={`${urlSegment}-${index}`}
            className={cn('px-[0.5px] text-foreground', {
              'text-cyan-500': params.includes(urlSegment),
              'text-muted-foreground/70': urlSegment === '/',
            })}
          >
            {urlSegment}
          </span>
        );
      })}
    </span>
  );
};
