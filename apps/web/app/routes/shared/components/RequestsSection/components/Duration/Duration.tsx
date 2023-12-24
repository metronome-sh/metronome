import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { useIsNavigatingSharedProject } from '#app/routes/shared/hooks/useIsNavigatingSharedProject';
import { useSharedProjectEventData } from '#app/routes/shared/hooks/useSharedProjectEventData';
import { useSharedProjectLoaderData } from '#app/routes/shared/hooks/useSharedProjectLoaderData';
import { Metric } from '#app/routes/teams/routes/projects/components';
import { formatDuration } from '#app/utils';

export const Duration: FunctionComponent = () => {
  const { requestsOverview } = useSharedProjectLoaderData();
  const { requestsOverview: requestsOverviewEvent } = useSharedProjectEventData();

  const title = 'Median Duration';

  const isNavigating = useIsNavigatingSharedProject();

  if (isNavigating) {
    return <Metric.Skeleton title={title} compact />;
  }

  return (
    <Suspense fallback={<Metric.Skeleton title={title} compact />}>
      <Await resolve={requestsOverview} errorElement={<Metric.Error title={title} compact />}>
        {(resolvedRequestsOverview) => {
          // prettier-ignore
          const value = formatDuration(requestsOverviewEvent?.duration?.p50 ?? resolvedRequestsOverview.duration?.p50, 'ns');
          return <Metric title={title} value={value} compact />;
        }}
      </Await>
    </Suspense>
  );
};
