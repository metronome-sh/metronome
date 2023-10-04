import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { formatNumber } from '#app/utils';

import { Metric } from '../../../../../../components';
import {
  useIsNavigatingOverview,
  useOverviewEventData,
  useOverviewLoaderData,
} from '../../../../hooks';

export const Requests: FunctionComponent = () => {
  const { requestsOverview } = useOverviewLoaderData();
  const { requestsOverview: requestsOverviewEvent } = useOverviewEventData();

  const title = 'Total Requests';

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
          return (
            <Metric
              title={title}
              value={formatNumber(
                requestsOverviewEvent?.count ?? resolvedRequestsOverview.count,
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
