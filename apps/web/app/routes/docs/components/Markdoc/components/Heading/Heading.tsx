import { type FunctionComponent, type PropsWithChildren } from 'react';

import { cn } from '#app/components';

import { toSlug } from '../../../../helpers';

export type HeadingProps = PropsWithChildren<{
  level: number;
  className?: string;
}>;

export const Heading: FunctionComponent<HeadingProps> = ({
  children,
  level,
  className,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = `h${level}` as any;

  return (
    <Component
      id={toSlug(children as string)}
      className={cn(
        className,
        'pt-6 pb-2 font-semibold',
        level === 1 && 'text-3xl',
        level === 2 && 'text-2xl',
        level === 3 && 'text-xl',
        level === 4 && 'text-lg',
        level === 5 && 'text-base',
        level === 6 && 'text-sm',
      )}
      style={{ scrollMarginTop: '5rem' }}
    >
      {children}
    </Component>
  );
};
