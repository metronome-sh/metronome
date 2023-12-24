import { Await } from '@remix-run/react';
import { type FunctionComponent } from 'react';
import { Suspense } from 'react';

import { Metric } from '#app/routes/teams/routes/projects/components';
import { formatTime } from '#app/utils';

import { useIsNavigatingSharedProject } from '../../../../hooks/useIsNavigatingSharedProject';
import { useSharedProjectEventData } from '../../../../hooks/useSharedProjectEventData';
import { useSharedProjectLoaderData } from '../../../../hooks/useSharedProjectLoaderData';

export const SessionMedianDuration: FunctionComponent = () => {
  const { sessionsOverview } = useSharedProjectLoaderData();
  const { sessionsOverview: sessionsOverviewEvent } = useSharedProjectEventData();

  const title = 'Median session time';

  const isNavigating = useIsNavigatingSharedProject();

  if (isNavigating) {
    return <Metric.Skeleton title={title} />;
  }

  return (
    <Suspense fallback={<Metric.Skeleton title={title} />}>
      <Await resolve={sessionsOverview} errorElement={<Metric.Error title={title} />}>
        {(resolvedSessionsOverview) => {
          const value =
            sessionsOverviewEvent?.duration.p50 ?? resolvedSessionsOverview.duration.p50;
          return <Metric title={title} value={formatTime(value)} />;
        }}
      </Await>
    </Suspense>
  );
};
