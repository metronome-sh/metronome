import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { useIsNavigatingSharedProject } from '#app/routes/shared/hooks/useIsNavigatingSharedProject';
import { useSharedProjectEventData } from '#app/routes/shared/hooks/useSharedProjectEventData';
import { useSharedProjectLoaderData } from '#app/routes/shared/hooks/useSharedProjectLoaderData';
import { Metric } from '#app/routes/teams/routes/projects/components';
import { formatNumber } from '#app/utils';

export const DataRequests: FunctionComponent = () => {
  const { requestsOverview } = useSharedProjectLoaderData();
  const { requestsOverview: requestsOverviewEvent } = useSharedProjectEventData();

  const title = 'Data requests';

  const isNavigating = useIsNavigatingSharedProject();

  if (isNavigating) {
    return <Metric.Skeleton title={title} compact />;
  }

  return (
    <Suspense fallback={<Metric.Skeleton title={title} compact />}>
      <Await resolve={requestsOverview} errorElement={<Metric.Error title={title} compact />}>
        {(resolvedRequestsOverview) => {
          // prettier-ignore
          const value = requestsOverviewEvent?.dataCount ?? resolvedRequestsOverview.dataCount;

          return (
            <Metric
              title={title}
              value={formatNumber(value, '0')}
              rawValue={
                value && value > 1000 ? `${value?.toLocaleString()} total requests` : undefined
              }
              compact
            />
          );
        }}
      </Await>
    </Suspense>
  );
};
