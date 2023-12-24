import { Await } from '@remix-run/react';
import { type FunctionComponent } from 'react';
import { Suspense } from 'react';

import { BarStackChart } from '#app/components';
import { useIsNavigatingSharedProject } from '#app/routes/shared/hooks/useIsNavigatingSharedProject';
import { useSharedProjectEventData } from '#app/routes/shared/hooks/useSharedProjectEventData';
import { useSharedProjectLoaderData } from '#app/routes/shared/hooks/useSharedProjectLoaderData';

export const Chart: FunctionComponent = () => {
  const { loadersOverviewSeries } = useSharedProjectLoaderData();
  const { loadersOverviewSeries: loadersOverviewSeriesEvent } = useSharedProjectEventData();

  const isNavigating = useIsNavigatingSharedProject();

  if (isNavigating) {
    return <BarStackChart.Skeleton />;
  }

  return (
    <Suspense fallback={<BarStackChart.Skeleton />}>
      <Await resolve={loadersOverviewSeries} errorElement={<BarStackChart.Error />}>
        {(resolvedLoadersSeries) => {
          const series = (loadersOverviewSeriesEvent?.series ?? resolvedLoadersSeries.series).map(
            ({ timestamp, okCount, erroredCount }) => ({
              timestamp,
              okCount,
              erroredCount,
            }),
          );

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
