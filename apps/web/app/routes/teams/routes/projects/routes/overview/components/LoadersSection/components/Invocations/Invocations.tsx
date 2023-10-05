import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { formatNumber } from '#app/utils';

import { Metric } from '../../../../../../components/Metric';
import { useOverviewEventData, useOverviewLoaderData } from '../../../../hooks';
import { useIsNavigatingOverview } from '../../../../hooks/useIsNavigatingOverview';

export const Invocations: FunctionComponent = () => {
  const { loadersOverview } = useOverviewLoaderData();
  const { loadersOverview: loadersOverviewEvent } = useOverviewEventData();

  const title = 'Invocations';

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
          return (
            <Metric
              title={title}
              value={formatNumber(
                loadersOverviewEvent?.count ?? resolvedLoadersOverview.count,
                '0',
              )}
              compact
            />
          );
        }}
      </Await>
    </Suspense>
  );
};
