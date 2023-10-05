import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { formatNumber } from '#app/utils';

import { Metric } from '../../../../../../components/Metric';
import {
  useIsNavigatingOverview,
  useOverviewEventData,
  useOverviewLoaderData,
} from '../../../../hooks';

export const Invocations: FunctionComponent = () => {
  const { actionsOverview } = useOverviewLoaderData();
  const { actionsOverview: actionsOverviewEvent } = useOverviewEventData();

  const title = 'Invocations';

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
          return (
            <Metric
              title={title}
              value={formatNumber(
                actionsOverviewEvent?.count ?? resolvedActionsOverview.count,
                '0',
              )}
              compact
            />
          );
        }}
      </Await>
    </Suspense>
  );
};
