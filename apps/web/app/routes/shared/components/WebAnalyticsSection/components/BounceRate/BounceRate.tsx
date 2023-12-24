import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { useIsNavigatingSharedProject } from '#app/routes/shared/hooks/useIsNavigatingSharedProject';
import { useSharedProjectEventData } from '#app/routes/shared/hooks/useSharedProjectEventData';
import { useSharedProjectLoaderData } from '#app/routes/shared/hooks/useSharedProjectLoaderData';
import { Metric } from '#app/routes/teams/routes/projects/components';

export const BounceRate: FunctionComponent = () => {
  const { bounceRate } = useSharedProjectLoaderData();
  const { bounceRate: bounceRateEvent } = useSharedProjectEventData();

  const title = 'Bounce rate';

  const isNavigating = useIsNavigatingSharedProject();

  if (isNavigating) {
    return <Metric.Skeleton title={title} />;
  }

  return (
    <Suspense fallback={<Metric.Skeleton title={title} />}>
      <Await resolve={bounceRate} errorElement={<Metric.Error title={title} />}>
        {(resolvedBounceRate) => {
          const value = bounceRateEvent ?? resolvedBounceRate;
          return <Metric title={title} value={value !== null ? `${Math.round(value)}%` : '—'} />;
        }}
      </Await>
    </Suspense>
  );
};
