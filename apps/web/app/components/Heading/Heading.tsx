import { type FunctionComponent } from 'react';

import { Separator } from '#app/components';
import { cn } from '#app/components/utils';

export type PageHeaderProps = {
  className?: string;
  separatorClassName?: string;
  title: string;
  description?: string;
};

export const Heading: FunctionComponent<PageHeaderProps> = ({
  className,
  title,
  description,
  separatorClassName,
}) => {
  return (
    <div>
      <div className={cn('space-y-0.5 px-4 pt-6 pb-6', className)}>
        <h1 className="text-2xl font-medium">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Separator
        className={cn('opacity-50 mx-4 md:mb-10', separatorClassName)}
      />
    </div>
  );
};
