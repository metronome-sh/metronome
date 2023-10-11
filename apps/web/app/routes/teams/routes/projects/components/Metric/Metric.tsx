import {
  forwardRef,
  type FunctionComponent,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

import { cn, Icon, Tooltip } from '#app/components';

type MetricProps = PropsWithChildren<{
  title: ReactNode;
  value: string | number;
  rawValue?: string | number;
  compact?: boolean;
  containerClassName?: string;
  valueClassName?: string;
  titleClassName?: string;
}>;

const BaseComponent = forwardRef<HTMLDivElement, MetricProps>(
  (
    {
      title,
      value,
      rawValue,
      compact,
      children,
      containerClassName,
      valueClassName,
      titleClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          'bg-opacity-50 flex flex-col bg-muted/30',
          compact
            ? 'py-3 px-6 transition-all hover:bg-muted/60 rounded-lg'
            : 'py-3 lg:py-5 px-4 lg:px-8 space-y-1 rounded-xl',
          containerClassName,
        )}
      >
        <Tooltip.Provider>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <div
                className={cn(
                  'text-foreground cursor-default font-semibold',
                  compact ? 'text-xl md:text-xl' : 'text-2xl md:text-2xl',
                  valueClassName,
                )}
              >
                {value}
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content className={cn({ invisible: !rawValue })}>
              <p>{rawValue}</p>
            </Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>
        <div
          className={cn(
            'text-muted-foreground flex-grow flex md:items-center text-sm',
            compact && 'text-sm',
            titleClassName,
          )}
        >
          {title}
        </div>
        {children}
      </div>
    );
  },
);

BaseComponent.displayName = 'Metric';

type MetricSkeletonProps = {
  title: ReactNode;
  compact?: boolean;
};

const MetricSkeleton: FunctionComponent<MetricSkeletonProps> = ({
  title,
  compact,
}) => {
  return (
    <BaseComponent
      title={title}
      value="0000"
      compact={compact}
      valueClassName={cn(
        'text-transparent pointer-events-none animate-pulse bg-muted-foreground/10 rounded-md my-0.5',
        compact ? 'md:text-base' : 'md:text-lg',
      )}
    />
  );
};

type MetricErrorProps = {
  title: ReactNode;
  compact?: boolean;
};

const MetricError: FunctionComponent<MetricErrorProps> = ({
  title,
  compact,
}) => {
  return (
    <BaseComponent
      title={title}
      value="0000"
      compact={compact}
      valueClassName="text-transparent pointer-events-none"
      titleClassName="text-transparent pointer-events-none"
      containerClassName="relative"
    >
      <div
        className={cn(
          'absolute inset-0 flex gap-2 items-center',
          compact ? 'py-3 px-6' : 'px-4 lg:px-8',
        )}
      >
        <div className="text-destructive">
          <Icon.MoodSadDizzy className="w-6 h-6" />
        </div>
        <div className="text-muted-foreground text-sm">Oops!</div>
      </div>
    </BaseComponent>
  );
};

export const Metric = Object.assign(BaseComponent, {
  Skeleton: MetricSkeleton,
  Error: MetricError,
});
