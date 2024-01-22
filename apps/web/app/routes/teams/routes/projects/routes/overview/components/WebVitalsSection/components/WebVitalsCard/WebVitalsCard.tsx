import { type FunctionComponent, type PropsWithChildren, type ReactNode } from 'react';

import { cn, Icon } from '#app/components';

import { WebVitalBar } from './components';

type WebVitalsCardProps = PropsWithChildren<{
  name: string;
  value?: ReactNode;
  median?: ReactNode;
  p10?: ReactNode;
  score?: number | null;
  isLoading?: boolean;
  nameClassName?: string;
  valueClassName?: string;
  webVitalsBarClassName?: string;
}>;

export const WebVitalsCard: FunctionComponent<WebVitalsCardProps> & {
  Skeleton: typeof WebVitalsCardSkeleton;
  Error: typeof WebVitalsCardError;
} = ({
  name,
  value,
  median,
  p10,
  score,
  isLoading,
  nameClassName,
  valueClassName,
  webVitalsBarClassName,
  children,
}) => {
  return (
    <div className="flex flex-col gap-3 bg-muted/30 py-3 lg:py-5 px-4 lg:px-6 rounded-xl relative group">
      <div className="flex justify-between">
        <div className={cn('text-left text-muted-foreground text-lg', nameClassName)}>{name}</div>
        <div
          className={cn(
            'text-right text-xl',
            value || value === 0 ? 'text-foreground' : 'text-muted',
            valueClassName,
          )}
        >
          {value ?? '—'}
        </div>
      </div>
      <div className={webVitalsBarClassName}>
        <WebVitalBar
          score={score}
          left={median}
          right={p10}
          isDisabled={!(value || value === 0)}
          isLoading={isLoading}
        />
      </div>
      {children}
    </div>
  );
};

type WebVitalsCardSkeletonProps = {
  name: string;
  median?: ReactNode;
  p10?: ReactNode;
};

const WebVitalsCardSkeleton: FunctionComponent<WebVitalsCardSkeletonProps> = ({
  name,
  median,
  p10,
}) => {
  return (
    <WebVitalsCard
      valueClassName="text-transparent pointer-events-none animate-pulse bg-muted-foreground/10 rounded-lg my-0.5 text-sm"
      name={name}
      median={median}
      p10={p10}
      value="000000"
      isLoading
    />
  );
};

WebVitalsCard.Skeleton = WebVitalsCardSkeleton;

const WebVitalsCardError: FunctionComponent = () => {
  return (
    <WebVitalsCard
      valueClassName="opacity-0"
      webVitalsBarClassName="opacity-0"
      nameClassName="opacity-0"
      name="Error"
      value="000000"
    >
      <div className={cn('absolute inset-0 flex gap-2 items-center px-4 lg:px-8')}>
        <div>
          <Icon.AlertSquareRoundedOutline className="stroke-destructive" />
        </div>
        <div className="text-muted-foreground text-sm">Oops!</div>
      </div>
    </WebVitalsCard>
  );
};

WebVitalsCard.Error = WebVitalsCardError;
