import * as Tabs from '@radix-ui/react-tabs';
import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { BarStackChart } from '#app/components/BarStackChart';
import { formatTime } from '#app/utils/formatTime';

import {
  useIsNavigatingWebAnalytics,
  useWebAnalyticsEventData,
  useWebAnalyticsLoaderData,
} from '../../../../hooks';

export const MedianSessionTimeTabContent: FunctionComponent = () => {
  const { overviewSeries } = useWebAnalyticsLoaderData();
  const { overviewSeries: overviewSeriesEvent } = useWebAnalyticsEventData();

  const isNavigating = useIsNavigatingWebAnalytics();

  return (
    <Tabs.Content value="median-session-time" asChild>
      {isNavigating ? (
        <BarStackChart.Skeleton />
      ) : (
        <Suspense fallback={<BarStackChart.Skeleton />}>
          <Await
            resolve={overviewSeries}
            errorElement={<BarStackChart.Error />}
          >
            {(resolvedOverviewSeries) => {
              const series = (
                overviewSeriesEvent?.series ?? resolvedOverviewSeries.series
              ).map(({ timestamp, duration }) => ({ timestamp, duration }));

              return (
                <BarStackChart
                  // TODO - fix this
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  data={series as any}
                  colors={['#f59e0b']}
                  labels={{ duration: 'Session Duration' }}
                  formatValues={{ duration: formatTime }}
                />
              );
            }}
          </Await>
        </Suspense>
      )}
    </Tabs.Content>
  );
};
