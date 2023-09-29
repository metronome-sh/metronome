import { type FunctionComponent, type PropsWithChildren } from 'react';

import { Separator } from '#app/components';
import { cn } from '#app/components/utils';

export type PageHeaderProps = PropsWithChildren<{
  className?: string;
  title: string;
  description?: string;
}>;

export const Heading: FunctionComponent<PageHeaderProps> = ({
  className,
  title,
  description,
  children,
}) => {
  return (
    <div>
      <div className={cn('space-y-0.5 px-4 md:px-8 pt-4 pb-6', className)}>
        <h1 className="text-2xl font-medium">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children ? (
        <Separator className="my-3 md:mt-6 md:mb-2 opacity-50" />
      ) : null}
      {children}
      {children ? (
        <Separator className="my-3 md:mt-2 md:mb-2 opacity-50" />
      ) : null}
    </div>
  );
};
