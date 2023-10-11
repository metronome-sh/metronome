import { Await } from '@remix-run/react';
import { type FunctionComponent } from 'react';
import { Suspense } from 'react';

import { Metric } from '#app/routes/teams/routes/projects/components';
import { formatTime } from '#app/utils';

import {
  useIsNavigatingOverview,
  useOverviewEventData,
  useOverviewLoaderData,
} from '../../../../hooks';

export const SessionMedianDuration: FunctionComponent = () => {
  const { sessionsOverview } = useOverviewLoaderData();
  const { sessionsOverview: sessionsOverviewEvent } = useOverviewEventData();

  const title = 'Median session time';

  const isNavigating = useIsNavigatingOverview();

  if (isNavigating) {
    return <Metric.Skeleton title={title} />;
  }

  return (
    <Suspense fallback={<Metric.Skeleton title={title} />}>
      <Await
        resolve={sessionsOverview}
        errorElement={<Metric.Error title={title} />}
      >
        {(resolvedSessionsOverview) => {
          const value =
            sessionsOverviewEvent?.duration.p50 ??
            resolvedSessionsOverview.duration.p50;
          return <Metric title={title} value={formatTime(value)} />;
        }}
      </Await>
    </Suspense>
  );
};
