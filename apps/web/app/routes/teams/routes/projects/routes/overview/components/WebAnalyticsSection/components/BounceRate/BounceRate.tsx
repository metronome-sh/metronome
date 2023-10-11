import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { Metric } from '#app/routes/teams/routes/projects/components';

import {
  useIsNavigatingOverview,
  useOverviewEventData,
  useOverviewLoaderData,
} from '../../../../hooks';

export const BounceRate: FunctionComponent = () => {
  const { bounceRate } = useOverviewLoaderData();
  const { bounceRate: bounceRateEvent } = useOverviewEventData();

  const title = 'Bounce rate';

  const isNavigating = useIsNavigatingOverview();

  if (isNavigating) {
    return <Metric.Skeleton title={title} />;
  }

  return (
    <Suspense fallback={<Metric.Skeleton title={title} />}>
      <Await resolve={bounceRate} errorElement={<Metric.Error title={title} />}>
        {(resolvedBounceRate) => {
          const value = bounceRateEvent ?? resolvedBounceRate;
          return (
            <Metric
              title={title}
              value={value !== null ? `${Math.round(value)}%` : '—'}
            />
          );
        }}
      </Await>
    </Suspense>
  );
};
