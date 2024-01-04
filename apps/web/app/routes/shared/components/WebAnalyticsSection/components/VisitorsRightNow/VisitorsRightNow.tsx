import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { useIsNavigatingSharedProject } from '#app/routes/shared/hooks/useIsNavigatingSharedProject';
import { useSharedProjectEventData } from '#app/routes/shared/hooks/useSharedProjectEventData';
import { useSharedProjectLoaderData } from '#app/routes/shared/hooks/useSharedProjectLoaderData';
import { Metric } from '#app/routes/teams/routes/projects/components';
import { formatNumber } from '#app/utils';

export const VisitorsRightNow: FunctionComponent = () => {
  // const { visitorsRightNow } = useLoaderData<{ visitorsRightNow?: Promise<number> }>();
  // const { visitorsRightNow: visitorsRightNowEvent } = useEventData<{ visitorsRightNow?: number }>();

  const { visitorsRightNow } = useSharedProjectLoaderData();
  const { visitorsRightNow: visitorsRightNowEvent } = useSharedProjectEventData();

  const title = 'Visitors right now';

  const isNavigating = useIsNavigatingSharedProject();

  if (isNavigating) return <Metric.Skeleton title={title} />;

  return (
    <Suspense fallback={<Metric.Skeleton title={title} />}>
      <Await resolve={visitorsRightNow} errorElement={<Metric.Error title={title} />}>
        {(resolvedVisitorsRightNow) => {
          // prettier-ignore
          const value = visitorsRightNowEvent ?? resolvedVisitorsRightNow;
          return <Metric title={title} value={formatNumber(value)} />;
        }}
      </Await>
    </Suspense>
  );
};
