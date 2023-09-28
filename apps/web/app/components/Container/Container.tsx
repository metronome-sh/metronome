import { FunctionComponent, PropsWithChildren } from 'react';

import { cn } from '../utils.ts';

export type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export const Container: FunctionComponent<ContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100dvh)] max-w-screen-2xl',
        className,
      )}
    >
      {children}
    </div>
  );
};
