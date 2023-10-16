import * as Tabs from '@radix-ui/react-tabs';
import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { BarStackChart } from '#app/components/BarStackChart';

import {
  useIsNavigatingWebAnalytics,
  useWebAnalyticsEventData,
  useWebAnalyticsLoaderData,
} from '../../../../hooks';

export const VisitorsChartTabContent: FunctionComponent = () => {
  const { overviewSeries } = useWebAnalyticsLoaderData();
  const { overviewSeries: overviewSeriesEvent } = useWebAnalyticsEventData();

  const isNavigating = useIsNavigatingWebAnalytics();

  return (
    <Tabs.Content value="visitors" asChild>
      {isNavigating ? (
        <BarStackChart.Skeleton />
      ) : (
        <Suspense fallback={<BarStackChart.Skeleton />}>
          <Await
            resolve={overviewSeries}
            errorElement={<BarStackChart.Error />}
          >
            {(resolvedOverviewSeries) => {
              const value =
                overviewSeriesEvent?.series ?? resolvedOverviewSeries.series;

              const series = value.map(({ timestamp, uniqueUserIds }) => ({
                timestamp,
                uniqueUserIds,
              }));

              return (
                <BarStackChart
                  // TODO - fix this
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  data={series as any}
                  colors={['#0d9488']}
                  labels={{ uniqueUserIds: 'Visitors' }}
                />
              );
            }}
          </Await>
        </Suspense>
      )}
    </Tabs.Content>
  );
};
