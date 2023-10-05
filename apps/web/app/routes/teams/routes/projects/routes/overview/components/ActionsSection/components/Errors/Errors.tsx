import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { formatNumber } from '#app/utils';

import { Metric } from '../../../../../../components/Metric';
import {
  useIsNavigatingOverview,
  useOverviewEventData,
  useOverviewLoaderData,
} from '../../../../hooks';

export const Errors: FunctionComponent = () => {
  const { actionsOverview } = useOverviewLoaderData();
  const { actionsOverview: actionsOverviewEvent } = useOverviewEventData();

  const title = 'Errors';

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
          const { erroredCount } =
            actionsOverviewEvent ?? resolvedActionsOverview;
          return (
            <Metric
              title={title}
              value={formatNumber(erroredCount, '0')}
              compact
            />
          );
        }}
      </Await>
    </Suspense>
  );
};
