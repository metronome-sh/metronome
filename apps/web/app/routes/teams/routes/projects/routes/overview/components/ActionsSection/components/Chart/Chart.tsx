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
    return <BarStackChart.Skeleton />;
  }

  return (
    <Suspense fallback={<BarStackChart.Skeleton />}>
      <Await
        resolve={actionsOverviewSeries}
        errorElement={<BarStackChart.Error />}
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
