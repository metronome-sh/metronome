import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { Metric } from '#app/routes/teams/routes/projects/components';
import { formatNumber } from '#app/utils';

import {
  useIsNavigatingOverview,
  useOverviewEventData,
  useOverviewLoaderData,
} from '../../../../hooks';

export const TotalPageviews: FunctionComponent = () => {
  const { pageviewsOverview } = useOverviewLoaderData();
  const { pageviewsOverview: pageviewsOverviewEvent } = useOverviewEventData();

  const isNavigating = useIsNavigatingOverview();

  const title = 'Views';

  if (isNavigating) {
    return <Metric.Skeleton title={title} />;
  }

  return (
    <Suspense fallback={<Metric.Skeleton title={title} />}>
      <Await
        resolve={pageviewsOverview}
        errorElement={<Metric.Error title={title} />}
      >
        {(resolvedPageviewsOverview) => {
          const value =
            pageviewsOverviewEvent?.pageviewCount ??
            resolvedPageviewsOverview.pageviewCount;

          return <Metric title={title} value={formatNumber(value, '0')} />;
        }}
      </Await>
    </Suspense>
  );
};
