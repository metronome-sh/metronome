import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { formatDuration } from '#app/utils';

import { Metric } from '../../../../../../components/Metric';
import { useOverviewEventData, useOverviewLoaderData } from '../../../../hooks';
import { useIsNavigatingOverview } from '../../../../hooks/useIsNavigatingOverview';

export const Duration: FunctionComponent = () => {
  const { loadersOverview } = useOverviewLoaderData();
  const { loadersOverview: loadersOverviewEvent } = useOverviewEventData();

  const title = 'Median Duration';

  const isNavigating = useIsNavigatingOverview();

  if (isNavigating) {
    return <Metric.Skeleton title={title} compact />;
  }

  return (
    <Suspense fallback={<Metric.Skeleton title={title} compact />}>
      <Await
        resolve={loadersOverview}
        errorElement={<Metric.Error title={title} compact />}
      >
        {(resolvedLoadersOverview) => {
          const duration =
            loadersOverviewEvent?.duration?.p50 ??
            resolvedLoadersOverview.duration?.p50;
          return (
            <Metric
              title={title}
              value={formatDuration(duration, 'ns')}
              compact
            />
          );
        }}
      </Await>
    </Suspense>
  );
};
