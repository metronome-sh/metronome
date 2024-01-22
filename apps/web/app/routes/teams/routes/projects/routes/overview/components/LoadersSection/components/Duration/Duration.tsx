import { loaders } from '@metronome/db.server';
import { Await, useLoaderData } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';
import { invariant } from 'ts-invariant';

import { useEventData } from '#app/hooks/useEventData';
import { formatDuration } from '#app/utils';

import { Metric } from '../../../../../../components/Metric';
import { useIsNavigatingOverview } from '../../../../hooks/useIsNavigatingOverview';

export const Duration: FunctionComponent = () => {
  const { loadersOverview } = useLoaderData() as {
    loadersOverview?: ReturnType<typeof loaders.overview>;
  };

  const { loadersOverview: loadersOverviewEvent } = useEventData() as {
    loadersOverview?: Awaited<ReturnType<typeof loaders.overview>>;
  };

  invariant(loadersOverview, 'requestOverview was not found in loader data');

  const title = 'Median Duration';

  const isNavigating = useIsNavigatingOverview();

  if (isNavigating) {
    return <Metric.Skeleton title={title} compact />;
  }

  return (
    <Suspense fallback={<Metric.Skeleton title={title} compact />}>
      <Await resolve={loadersOverview} errorElement={<Metric.Error title={title} compact />}>
        {(resolvedLoadersOverview) => {
          const duration =
            loadersOverviewEvent?.duration?.p50 ?? resolvedLoadersOverview.duration?.p50;
          return <Metric title={title} value={formatDuration(duration, 'ns')} compact />;
        }}
      </Await>
    </Suspense>
  );
};
