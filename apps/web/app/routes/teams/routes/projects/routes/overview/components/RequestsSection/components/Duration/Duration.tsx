import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { formatDuration } from '#app/utils';

import { Metric } from '../../../../../../components/Metric';
import {
  useIsNavigatingOverview,
  useOverviewEventData,
  useOverviewLoaderData,
} from '../../../../hooks';

export const Duration: FunctionComponent = () => {
  const { requestsOverview } = useOverviewLoaderData();
  const { requestsOverview: requestsOverviewEvent } = useOverviewEventData();

  const title = 'Median Duration';

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
          const value = formatDuration(requestsOverviewEvent?.duration?.p50 ?? resolvedRequestsOverview.duration?.p50, 'ns');
          return <Metric title={title} value={value} compact />;
        }}
      </Await>
    </Suspense>
  );
};
