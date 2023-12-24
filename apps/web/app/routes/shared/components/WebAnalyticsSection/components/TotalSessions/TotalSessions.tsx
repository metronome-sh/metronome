import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { useIsNavigatingSharedProject } from '#app/routes/shared/hooks/useIsNavigatingSharedProject';
import { useSharedProjectEventData } from '#app/routes/shared/hooks/useSharedProjectEventData';
import { useSharedProjectLoaderData } from '#app/routes/shared/hooks/useSharedProjectLoaderData';
import { Metric } from '#app/routes/teams/routes/projects/components';
import { formatNumber } from '#app/utils';

export const TotalSessions: FunctionComponent = () => {
  const { sessionsOverview } = useSharedProjectLoaderData();
  const { sessionsOverview: sessionsOverviewEvent } = useSharedProjectEventData();

  const title = 'Sessions';

  const isNavigating = useIsNavigatingSharedProject();

  if (isNavigating) {
    return <Metric.Skeleton title={title} />;
  }

  return (
    <Suspense fallback={<Metric.Skeleton title={title} />}>
      <Await resolve={sessionsOverview} errorElement={<Metric.Error title={title} />}>
        {(resolvedSessionsOverview) => {
          const value =
            sessionsOverviewEvent?.totalSessions ?? resolvedSessionsOverview.totalSessions;
          return <Metric title={title} value={formatNumber(value, '0')} />;
        }}
      </Await>
    </Suspense>
  );
};
