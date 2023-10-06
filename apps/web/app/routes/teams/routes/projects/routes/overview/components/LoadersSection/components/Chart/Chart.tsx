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
    return <BarStackChart.Skeleton />;
  }

  return (
    <Suspense fallback={<BarStackChart.Skeleton />}>
      <Await
        resolve={loadersOverviewSeries}
        errorElement={<BarStackChart.Error />}
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
