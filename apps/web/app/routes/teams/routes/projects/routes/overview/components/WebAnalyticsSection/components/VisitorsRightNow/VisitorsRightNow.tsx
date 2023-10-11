import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { Metric } from '#app/routes/teams/routes/projects/components';
import { formatNumber } from '#app/utils';

import {
  useIsNavigatingOverview,
  useOverviewEventData,
  useOverviewLoaderData,
} from '../../../../hooks';
// import {
//   useIsNavigatingOverview,
//   useOverviewEventData,
//   useOverviewLoaderData,
// } from '~/routes/teams/routes/projects/routes/overview/hooks';

export const VisitorsRightNow: FunctionComponent = () => {
  const { visitorsRightNow } = useOverviewLoaderData();
  const { visitorsRightNow: visitorsRightNowEvent } = useOverviewEventData();

  const title = 'Visitors right now';

  const isNavigating = useIsNavigatingOverview();

  if (isNavigating) return <Metric.Skeleton title={title} />;

  return (
    <Suspense fallback={<Metric.Skeleton title={title} />}>
      <Await
        resolve={visitorsRightNow}
        errorElement={<Metric.Error title={title} />}
      >
        {(resolvedVisitorsRightNow) => {
          // prettier-ignore
          const value = visitorsRightNowEvent ?? resolvedVisitorsRightNow;
          return <Metric title={title} value={formatNumber(value)} />;
        }}
      </Await>
    </Suspense>
  );
};
