import * as Tabs from '@radix-ui/react-tabs';
import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { cn, TableWithBarChart, Tooltip } from '#app/components';
import { countryFlag, formatNumber } from '#app/utils';

import {
  useIsNavigatingWebAnalytics,
  useWebAnalyticsEventData,
  useWebAnalyticsLoaderData,
} from '../../../../hooks';

export const CountriesTabContent: FunctionComponent = () => {
  const { locationsByCountry } = useWebAnalyticsLoaderData();
  const { locationsByCountry: locationsByCountryEvent } =
    useWebAnalyticsEventData();
  const isNavigating = useIsNavigatingWebAnalytics();

  return (
    <Tabs.Content value="countries" asChild>
      {isNavigating ? (
        <TableWithBarChart.Skeleton />
      ) : (
        <Suspense fallback={<TableWithBarChart.Skeleton />}>
          <Await
            resolve={locationsByCountry}
            errorElement={<TableWithBarChart.Error />}
          >
            {(resolvedLocationsByCountry) => {
              return (
                <TableWithBarChart<
                  keyof Awaited<typeof resolvedLocationsByCountry>[number]
                >
                  data={locationsByCountryEvent ?? resolvedLocationsByCountry}
                  valueKey="count"
                  headers={{
                    countryCode: { hidden: true },
                    count: { className: 'text-right', label: 'Visitors' },
                  }}
                  cells={{
                    country: { className: 'capitalize' },
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
