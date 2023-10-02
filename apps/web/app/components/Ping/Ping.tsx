import { FunctionComponent } from 'react';

import { cn } from '../utils';

export const Ping: FunctionComponent<{ className?: string }> = ({
  className,
}) => {
  return (
    <span className={cn('relative flex h-3 w-3', className)}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span
        className={cn(
          'relative inline-flex rounded-full h-3 w-3 bg-green-500',
          className,
        )}
      ></span>
    </span>
  );
};
