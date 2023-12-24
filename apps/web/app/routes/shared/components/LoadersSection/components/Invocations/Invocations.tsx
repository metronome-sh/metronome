import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { useIsNavigatingSharedProject } from '#app/routes/shared/hooks/useIsNavigatingSharedProject';
import { useSharedProjectEventData } from '#app/routes/shared/hooks/useSharedProjectEventData';
import { useSharedProjectLoaderData } from '#app/routes/shared/hooks/useSharedProjectLoaderData';
import { Metric } from '#app/routes/teams/routes/projects/components';
import { formatNumber } from '#app/utils';

export const Invocations: FunctionComponent = () => {
  const { loadersOverview } = useSharedProjectLoaderData();
  const { loadersOverview: loadersOverviewEvent } = useSharedProjectEventData();

  const title = 'Invocations';

  const isNavigating = useIsNavigatingSharedProject();

  if (isNavigating) {
    return <Metric.Skeleton title={title} compact />;
  }

  return (
    <Suspense fallback={<Metric.Skeleton title={title} compact />}>
      <Await resolve={loadersOverview} errorElement={<Metric.Error title={title} compact />}>
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
