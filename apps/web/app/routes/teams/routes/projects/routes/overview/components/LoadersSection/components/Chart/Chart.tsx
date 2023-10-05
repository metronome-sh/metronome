import { Await } from '@remix-run/react';
import { type FunctionComponent } from 'react';
import { Suspense } from 'react';

import { BarStackChart, Icon, Spinner } from '#app/components';

import { useOverviewEventData, useOverviewLoaderData } from '../../../../hooks';
import { useIsNavigatingOverview } from '../../../../hooks/useIsNavigatingOverview';

export const Chart: FunctionComponent = () => {
  const { loadersOverviewSeries } = useOverviewLoaderData();
  const { loadersOverviewSeries: loadersOverviewSeriesEvent } =
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
        resolve={loadersOverviewSeries}
        errorElement={
          <div className="flex flex-col items-center justify-center w-full h-full text-muted-foreground">
            <Icon.AlertSquareRoundedOutline className="stroke-red-500" />
            <span className="text-sm">An error has occurred</span>
          </div>
        }
      >
        {(resolvedLoadersSeries) => {
          const series = (
            loadersOverviewSeriesEvent?.series ?? resolvedLoadersSeries.series
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
              colors={['#0891b2', '#f5bf4f']}
              labels={{ okCount: 'Invocations', erroredCount: 'Errors' }}
            />
          );
        }}
      </Await>
    </Suspense>
  );
};
