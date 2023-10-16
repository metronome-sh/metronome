import * as Tabs from '@radix-ui/react-tabs';
import { Await } from '@remix-run/react';
import { type FunctionComponent } from 'react';
import { Suspense } from 'react';

import { Metric } from '#app/routes/teams/routes/projects/components/Metric';
import { formatTime } from '#app/utils/formatTime';

import {
  useIsNavigatingWebAnalytics,
  useWebAnalyticsEventData,
  useWebAnalyticsLoaderData,
} from '../../../../hooks';

export const MedianSessionTimeTabTrigger: FunctionComponent = () => {
  const { sessionsOverview } = useWebAnalyticsLoaderData();
  const { sessionsOverview: sessionsOverviewEvent } =
    useWebAnalyticsEventData();

  const title = 'Median session time';

  const isNavigating = useIsNavigatingWebAnalytics();

  if (isNavigating) return <Metric.Skeleton title={title} compact />;

  return (
    <Suspense fallback={<Metric.Skeleton title={title} compact />}>
      <Await
        resolve={sessionsOverview}
        errorElement={<Metric.Error title={title} compact />}
      >
        {(resolvedSessionsOverview) => {
          const value =
            sessionsOverviewEvent?.duration?.p50 ??
            resolvedSessionsOverview.duration.p50 ??
            0;

          return (
            <Tabs.Trigger value="median-session-time" asChild>
              <Metric
                compact
                title={title}
                value={formatTime(value)}
                containerClassName="relative group cursor-pointer"
              >
                <div className="absolute inset-y-1 left-1 w-1 rounded-full bg-muted group-[[data-state=active]]:bg-amber-500" />
              </Metric>
            </Tabs.Trigger>
          );
        }}
      </Await>
    </Suspense>
  );
};
