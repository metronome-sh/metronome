import { type FunctionComponent, type ReactNode } from 'react';

import { cn, Icon } from '#app/components';

export type WebVitalBarProps = {
  score?: number | null;
  left: ReactNode;
  right: ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
};

export const WebVitalBar: FunctionComponent<WebVitalBarProps> = ({
  score = 0,
  left,
  right,
  isDisabled,
  isLoading,
}) => {
  const hasValue = score !== null && score !== undefined;

  return (
    <div className={cn(isLoading && 'opacity-[0.15]')}>
      <div className={cn('w-full', isLoading && 'animate-pulse')}>
        <div
          className={cn(
            'flex',
            (isDisabled || isLoading || !hasValue) && 'opacity-0',
          )}
        >
          <div className="" style={{ width: `${100 - (score ?? 0)}%` }} />
          <div className="relative h-2 flex-grow">
            <div className="absolute -top-4 -ml-1">
              <Icon.TriangleInvertedFilled
                className={cn(
                  'w-2 h-2',
                  (score ?? 0) < 33.3333
                    ? 'text-red-500'
                    : (score ?? 0) < 66.6666
                    ? 'text-yellow-400'
                    : 'text-green-500',
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center">
          <div
            className={cn(
              'h-1 rounded-l-lg w-1/3 border-r-[1px]',
              isDisabled || isLoading
                ? 'bg-muted-foreground'
                : 'bg-green-500 group-hover:opacity-100 transition-opacity',
              !hasValue && 'bg-muted-foreground opacity-50',
              !(isDisabled || isLoading) &&
                (score ?? 0) < 66.6666 &&
                'opacity-50',
            )}
          />
          <div
            className={cn(
              'h-1 w-1/3',
              isDisabled || isLoading
                ? 'bg-muted-foreground'
                : 'bg-yellow-400 group-hover:opacity-100 transition-opacity',
              !hasValue && 'bg-muted-foreground opacity-50',
              !(isDisabled || isLoading) &&
                ((score ?? 0) < 33.3333 || (score ?? 0) > 66.6666) &&
                'opacity-50',
            )}
          />
          <div
            className={cn(
              'h-1 rounded-r-lg w-1/3 border-l-[1px]',
              isDisabled || isLoading
                ? 'bg-muted-foreground'
                : 'bg-red-500 group-hover:opacity-100 transition-opacity',
              !hasValue && 'bg-muted-foreground opacity-50',
              !(isDisabled || isLoading) &&
                (score ?? 0) > 33.3333 &&
                'opacity-50',
            )}
          />
        </div>
        <div className="w-full flex items-centers">
          <div className="h-2 rounded-l-lg w-1/3 border-r-[1px] border-muted-foreground" />
          <div className="h-2 w-1/3" />
          <div className="h-2 rounded-r-lg w-1/3 border-l-[1px] border-muted-foreground" />
        </div>
        <div className="w-full grid grid-cols-9">
          <div className="text-muted-foreground flex justify-center col-start-3 col-span-2 text-xs">
            {left}
          </div>
          <div className="text-muted-foreground flex justify-center col-start-6 col-span-2 text-xs">
            {right}
          </div>
        </div>
      </div>
    </div>
  );
};
