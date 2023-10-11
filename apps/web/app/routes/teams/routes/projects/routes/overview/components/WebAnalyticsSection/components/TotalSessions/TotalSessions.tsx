import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { Metric } from '#app/routes/teams/routes/projects/components';
import { formatNumber } from '#app/utils';

import {
  useIsNavigatingOverview,
  useOverviewEventData,
  useOverviewLoaderData,
} from '../../../../hooks';

export const TotalSessions: FunctionComponent = () => {
  const { sessionsOverview } = useOverviewLoaderData();
  const { sessionsOverview: sessionsOverviewEvent } = useOverviewEventData();

  const title = 'Sessions';

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
            sessionsOverviewEvent?.totalSessions ??
            resolvedSessionsOverview.totalSessions;
          return <Metric title={title} value={formatNumber(value, '0')} />;
        }}
      </Await>
    </Suspense>
  );
};
