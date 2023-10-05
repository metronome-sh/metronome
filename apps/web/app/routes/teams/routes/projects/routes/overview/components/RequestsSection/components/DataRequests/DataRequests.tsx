import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { formatNumber } from '#app/utils';

import { Metric } from '../../../../../../components/Metric';
import { useOverviewEventData, useOverviewLoaderData } from '../../../../hooks';
import { useIsNavigatingOverview } from '../../../../hooks/useIsNavigatingOverview';

export const DataRequests: FunctionComponent = () => {
  const { requestsOverview } = useOverviewLoaderData();
  const { requestsOverview: requestsOverviewEvent } = useOverviewEventData();

  const title = 'Data requests';

  const isNavigating = useIsNavigatingOverview();

  if (isNavigating) {
    return <Metric.Skeleton title={title} compact />;
  }

  return (
    <Suspense fallback={<Metric.Skeleton title={title} compact />}>
      <Await
        resolve={requestsOverview}
        errorElement={<Metric.Error title={title} compact />}
      >
        {(resolvedRequestsOverview) => {
          // prettier-ignore
          const value = requestsOverviewEvent?.dataCount ?? resolvedRequestsOverview.dataCount;

          return (
            <Metric
              title={title}
              value={formatNumber(value, '0')}
              rawValue={
                value && value > 1000
                  ? `${value?.toLocaleString()} total requests`
                  : undefined
              }
              compact
            />
          );
        }}
      </Await>
    </Suspense>
  );
};
