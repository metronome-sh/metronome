import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { formatDuration } from '#app/utils';

import { Metric } from '../../../../../../components/Metric';
import {
  useIsNavigatingOverview,
  useOverviewEventData,
  useOverviewLoaderData,
} from '../../../../hooks';

export const Duration: FunctionComponent = () => {
  const { actionsOverview } = useOverviewLoaderData();
  const { actionsOverview: actionsOverviewEvent } = useOverviewEventData();

  const title = 'Median Duration';

  const isNavigating = useIsNavigatingOverview();

  if (isNavigating) {
    return <Metric.Skeleton title={title} compact />;
  }

  return (
    <Suspense fallback={<Metric.Skeleton title={title} compact />}>
      <Await
        resolve={actionsOverview}
        errorElement={<Metric.Error title={title} compact />}
      >
        {(resolvedActionsOverview) => {
          const {
            duration: { p50 },
          } = actionsOverviewEvent ?? resolvedActionsOverview;
          return (
            <Metric title={title} value={formatDuration(p50, 'ns')} compact />
          );
        }}
      </Await>
    </Suspense>
  );
};
