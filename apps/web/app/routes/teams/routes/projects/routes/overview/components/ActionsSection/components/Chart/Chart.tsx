import { Await } from '@remix-run/react';
import { type FunctionComponent } from 'react';
import { Suspense } from 'react';

import { BarStackChart, Icon, Spinner } from '#app/components';

import {
  useIsNavigatingOverview,
  useOverviewEventData,
  useOverviewLoaderData,
} from '../../../../hooks';

export const Chart: FunctionComponent = () => {
  const { actionsOverviewSeries } = useOverviewLoaderData();
  const { actionsOverviewSeries: actionsOverviewSeriesEvent } =
    useOverviewEventData();

  const isNavigating = useIsNavigatingOverview();

  if (isNavigating) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner className="-mt-12 h-10 w-10 text-xl" />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="h-full flex items-center justify-center">
          <Spinner className="-mt-12 h-10 w-10 text-xl" />
        </div>
      }
    >
      <Await
        resolve={actionsOverviewSeries}
        errorElement={
          <div className="flex flex-col items-center justify-center w-full h-full text-muted-foreground">
            <Icon.AlertSquareRoundedOutline className="stroke-red-500" />
            <span className="text-sm">An error has occurred</span>
          </div>
        }
      >
        {(resolvedActionsSeries) => {
          const series = (
            actionsOverviewSeriesEvent?.series ?? resolvedActionsSeries.series
          ).map(({ timestamp, okCount, erroredCount }) => ({
            timestamp,
            okCount,
            erroredCount,
          }));

          return (
            <BarStackChart
              // TODO - fix this
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data={series as any}
              colors={['#8b5cf6', '#f5bf4f']}
              labels={{ okCount: 'Invocations', erroredCount: 'Errors' }}
            />
          );
        }}
      </Await>
    </Suspense>
  );
};
