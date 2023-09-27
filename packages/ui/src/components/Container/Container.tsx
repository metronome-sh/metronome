import { FunctionComponent, PropsWithChildren } from 'react';
import { cn } from '#/utils.ts';

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
        'container mx-auto px-4 sm:px-6 lg:px-8 dark:bg-zinc-950 min-h-[calc(100dvh)]',
        className,
      )}
    >
      {children}
    </div>
  );
};
