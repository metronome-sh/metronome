import { Await } from '@remix-run/react';
import { type FunctionComponent } from 'react';
import { Suspense } from 'react';

import { BarStackChart, Icon, Spinner } from '#app/components';

import { useOverviewEventData, useOverviewLoaderData } from '../../../../hooks';
import { useIsNavigatingOverview } from '../../../../hooks/useIsNavigatingOverview';

export const Chart: FunctionComponent = () => {
  const { requestsCountSeries } = useOverviewLoaderData();
  const { requestsCountSeries: requestsCountSeriesEvent } =
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
        resolve={requestsCountSeries}
        errorElement={
          <div className="flex flex-col items-center justify-center w-full h-full text-muted-foreground">
            <Icon.AlertSquareRoundedOutline className="stroke-red-500" />
            <span className="text-sm">An error has occurred</span>
          </div>
        }
      >
        {(resolvedRequestsCountSeries) => {
          const data =
            requestsCountSeriesEvent?.series ??
            resolvedRequestsCountSeries.series;

          return (
            <BarStackChart
              // TODO - fix this
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data={data as any}
              colors={['#0d9488', '#14b8a6']}
              labels={{
                dataCount: 'Data requests',
                documentCount: 'Document requests',
              }}
            />
          );
        }}
      </Await>
    </Suspense>
  );
};
