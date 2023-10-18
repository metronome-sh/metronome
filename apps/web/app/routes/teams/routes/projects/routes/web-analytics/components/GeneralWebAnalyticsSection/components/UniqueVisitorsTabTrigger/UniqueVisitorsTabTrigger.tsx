import * as Tabs from '@radix-ui/react-tabs';
import { Await } from '@remix-run/react';
import { type FunctionComponent } from 'react';
import { Suspense } from 'react';

import { Metric } from '#app/routes/teams/routes/projects/components/Metric';
import { formatNumber } from '#app/utils';

import {
  useIsNavigatingWebAnalytics,
  useWebAnalyticsEventData,
  useWebAnalyticsLoaderData,
} from '../../../../hooks';

export const UniqueVisitorsTabTrigger: FunctionComponent = () => {
  const { sessionsOverview } = useWebAnalyticsLoaderData();
  const { sessionsOverview: sessionsOverviewEvent } =
    useWebAnalyticsEventData();

  const title = 'Unique visitors';

  const isNavigating = useIsNavigatingWebAnalytics();

  if (isNavigating) return <Metric.Skeleton title={title} compact />;

  return (
    <Suspense fallback={<Metric.Skeleton title={title} compact />}>
      <Await
        resolve={sessionsOverview}
        errorElement={<Metric.Error title={title} compact />}
      >
        {(resolvedSessionsOverview) => {
          // prettier-ignore
          const value = sessionsOverviewEvent?.uniqueVisitors ?? resolvedSessionsOverview?.uniqueVisitors ?? 0;

          return (
            <Tabs.Trigger value="visitors" asChild>
              <Metric
                compact
                title={title}
                value={formatNumber(value)}
                rawValue={`${value.toLocaleString()} unique visitors`}
                containerClassName="relative group cursor-pointer"
              >
                <div className="absolute inset-y-1 left-1 w-1 rounded-full bg-muted group-[[data-state=active]]:bg-teal-600" />
              </Metric>
            </Tabs.Trigger>
          );
        }}
      </Await>
    </Suspense>
  );
};
