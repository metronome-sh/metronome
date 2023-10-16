import * as Tabs from '@radix-ui/react-tabs';
import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { BarStackChart } from '#app/components/BarStackChart';

import {
  useIsNavigatingWebAnalytics,
  useWebAnalyticsEventData,
  useWebAnalyticsLoaderData,
} from '../../../../hooks';

export const ViewsTabContent: FunctionComponent = () => {
  const { overviewSeries } = useWebAnalyticsLoaderData();
  const { overviewSeries: overviewSeriesEvent } = useWebAnalyticsEventData();

  const isNavigating = useIsNavigatingWebAnalytics();

  return (
    <Tabs.Content value="views" asChild>
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
              ).map(({ timestamp, pageviews }) => ({ timestamp, pageviews }));

              return (
                <BarStackChart
                  // TODO - fix this
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  data={series as any}
                  colors={['#8b5cf6']}
                  labels={{ pageviews: 'Views' }}
                />
              );
            }}
          </Await>
        </Suspense>
      )}
    </Tabs.Content>
  );
};
