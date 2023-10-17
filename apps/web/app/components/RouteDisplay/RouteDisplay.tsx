import type { FunctionComponent } from 'react';
import { cn } from '../utils';

export type RouteDisplayProps = {
  route: string;
};

export const RouteDisplay: FunctionComponent<RouteDisplayProps> = ({ route }) => {
  const segments = route.split(/(\/)/).filter(Boolean);

  if (segments[0] !== '/') segments.unshift('/');

  return (
    <span className="font-mono text-sm leading-none">
      {segments.map((segment, index) => {
        return (
          <span
            key={`${segment}-${index}`}
            className={cn('px-[0.5px] text-foreground', {
              'text-cyan-500': segment.startsWith(':') || segment.startsWith('*'),
              'text-muted-foreground/70': segment === '/',
            })}
          >
            {segment}
          </span>
        );
      })}
    </span>
  );
};
