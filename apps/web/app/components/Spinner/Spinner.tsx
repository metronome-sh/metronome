import { type FunctionComponent } from 'react';

import { Icon } from '..';
import { cn } from '../utils';

export type SpinnerProps = {
  className?: string;
  containerClassName?: string;
};

export const Spinner: FunctionComponent<SpinnerProps> = ({
  className,
  containerClassName,
}) => {
  return (
    <div className={containerClassName}>
      <Icon.LoaderTwo
        className={cn(
          'animate-spin text-muted-foreground h-6 w-6 flex items-center fa-fw',
          className,
        )}
      />
    </div>
  );
};
