import * as Tabs from '@radix-ui/react-tabs';
import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { BarStackChart } from '#app/components/BarStackChart';

import {
  useWebAnalyticsEventData,
  useWebAnalyticsLoaderData,
} from '../../../../hooks';
import { useIsNavigatingWebAnalytics } from '../../../../hooks/useIsNavigatingWebAnalytics';

export const BounceRateTabContent: FunctionComponent = () => {
  const { bounceRateSeries } = useWebAnalyticsLoaderData();
  const { bounceRateSeries: bounceRateSeriesEvent } =
    useWebAnalyticsEventData();

  const isNavigating = useIsNavigatingWebAnalytics();

  return (
    <Tabs.Content value="bounce-rate" asChild>
      {isNavigating ? (
        <BarStackChart.Skeleton />
      ) : (
        <Suspense fallback={<BarStackChart.Skeleton />}>
          <Await
            resolve={bounceRateSeries}
            errorElement={<BarStackChart.Error />}
          >
            {(resolvedBounceRateSeries) => {
              const series =
                bounceRateSeriesEvent?.series ??
                resolvedBounceRateSeries.series;
              return (
                <BarStackChart
                  // TODO - fix this
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  data={series as any}
                  colors={['#f43f5e']}
                  labels={{ bounceRate: 'Bounce rate' }}
                  formatValues={{
                    bounceRate: (value) =>
                      value !== null ? `${Math.round(value)}%` : '-',
                  }}
                />
              );
            }}
          </Await>
        </Suspense>
      )}
    </Tabs.Content>
  );
};
