import * as Tabs from '@radix-ui/react-tabs';
import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { TableWithBarChart, Tooltip } from '#app/components';
import { cn } from '#app/components/utils';
import { countryFlag, formatNumber } from '#app/utils';

import {
  useIsNavigatingWebAnalytics,
  useWebAnalyticsEventData,
  useWebAnalyticsLoaderData,
} from '../../../../hooks';

export const CitiesTabContent: FunctionComponent = () => {
  const { locationsByCity } = useWebAnalyticsLoaderData();
  const { locationsByCity: locationsByCityEvent } = useWebAnalyticsEventData();

  const isNavigating = useIsNavigatingWebAnalytics();

  return (
    <Tabs.Content value="cities" asChild>
      {isNavigating ? (
        <TableWithBarChart.Skeleton />
      ) : (
        <Suspense fallback={<TableWithBarChart.Skeleton />}>
          <Await
            resolve={locationsByCity}
            errorElement={<TableWithBarChart.Error />}
          >
            {(resolvedLocationsByCity) => {
              return (
                <TableWithBarChart<
                  keyof Awaited<typeof resolvedLocationsByCity>[number]
                >
                  data={locationsByCityEvent ?? resolvedLocationsByCity}
                  valueKey="count"
                  headers={{
                    countryCode: { hidden: true },
                    count: { className: 'text-right', label: 'Visitors' },
                  }}
                  cells={{
                    city: { className: 'capitalize' },
                    count: {
                      size: 70,
                      render: (value, { className, ...props }) => (
                        <div className={cn(className, 'text-right')} {...props}>
                          {(value as number) < 1000 ? (
                            value.toLocaleString()
                          ) : (
                            <Tooltip.Provider>
                              <Tooltip>
                                <Tooltip.Trigger
                                  disabled={(value as number) < 1000}
                                >
                                  {formatNumber(value as number)}
                                </Tooltip.Trigger>
                                <Tooltip.Content>
                                  <p>{value.toLocaleString()}</p>
                                </Tooltip.Content>
                              </Tooltip>
                            </Tooltip.Provider>
                          )}
                        </div>
                      ),
                    },
                    countryCode: {
                      size: 40,
                      render: (value, { className, ...props }) => (
                        <div className={cn(className, 'relative')} {...props}>
                          <div className="absolute inset-0 flex items-center justify-center text-xl pl-1">
                            {value === 'unknown' ? (
                              <span className="text-lg">🌎</span>
                            ) : (
                              countryFlag(value as string)
                            )}
                          </div>
                        </div>
                      ),
                    },
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
