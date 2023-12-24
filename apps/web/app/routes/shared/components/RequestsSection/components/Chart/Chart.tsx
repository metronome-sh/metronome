import { Await } from '@remix-run/react';
import { type FunctionComponent } from 'react';
import { Suspense } from 'react';

import { BarStackChart } from '#app/components';
import { useIsNavigatingSharedProject } from '#app/routes/shared/hooks/useIsNavigatingSharedProject';
import { useSharedProjectEventData } from '#app/routes/shared/hooks/useSharedProjectEventData';
import { useSharedProjectLoaderData } from '#app/routes/shared/hooks/useSharedProjectLoaderData';

export const Chart: FunctionComponent = () => {
  const { requestsCountSeries } = useSharedProjectLoaderData();
  const { requestsCountSeries: requestsCountSeriesEvent } = useSharedProjectEventData();

  const isNavigating = useIsNavigatingSharedProject();

  if (isNavigating) {
    return <BarStackChart.Skeleton />;
  }

  return (
    <Suspense fallback={<BarStackChart.Skeleton />}>
      <Await resolve={requestsCountSeries} errorElement={<BarStackChart.Error />}>
        {(resolvedRequestsCountSeries) => {
          const data = requestsCountSeriesEvent?.series ?? resolvedRequestsCountSeries.series;

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
