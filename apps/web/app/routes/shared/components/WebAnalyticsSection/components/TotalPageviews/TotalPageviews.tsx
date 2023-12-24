import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { useIsNavigatingSharedProject } from '#app/routes/shared/hooks/useIsNavigatingSharedProject';
import { useSharedProjectEventData } from '#app/routes/shared/hooks/useSharedProjectEventData';
import { useSharedProjectLoaderData } from '#app/routes/shared/hooks/useSharedProjectLoaderData';
import { Metric } from '#app/routes/teams/routes/projects/components';
import { formatNumber } from '#app/utils';

export const TotalPageviews: FunctionComponent = () => {
  const { pageviewsOverview } = useSharedProjectLoaderData();
  const { pageviewsOverview: pageviewsOverviewEvent } = useSharedProjectEventData();

  const isNavigating = useIsNavigatingSharedProject();

  const title = 'Views';

  if (isNavigating) {
    return <Metric.Skeleton title={title} />;
  }

  return (
    <Suspense fallback={<Metric.Skeleton title={title} />}>
      <Await resolve={pageviewsOverview} errorElement={<Metric.Error title={title} />}>
        {(resolvedPageviewsOverview) => {
          const value =
            pageviewsOverviewEvent?.pageviewCount ?? resolvedPageviewsOverview.pageviewCount;

          return <Metric title={title} value={formatNumber(value, '0')} />;
        }}
      </Await>
    </Suspense>
  );
};
