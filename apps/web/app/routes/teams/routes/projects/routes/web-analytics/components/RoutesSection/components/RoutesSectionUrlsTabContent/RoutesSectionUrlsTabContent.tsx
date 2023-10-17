import * as Tabs from '@radix-ui/react-tabs';
import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { Tooltip } from '#app/components';
import { TableWithBarChart } from '#app/components/TableWithBarChart';
import { UrlRouteDisplay } from '#app/components/UrlRouteDisplay';
import { cn } from '#app/components/utils';
import { formatNumber } from '#app/utils';

import {
  useIsNavigatingWebAnalytics,
  useWebAnalyticsEventData,
  useWebAnalyticsLoaderData,
} from '../../../../hooks';

export const RoutesSectionUrlsTabContent: FunctionComponent = () => {
  const { routesByUrlPath } = useWebAnalyticsLoaderData();
  const { routesByUrlPath: routesByUrlPathEvent } = useWebAnalyticsEventData();

  const isNavigating = useIsNavigatingWebAnalytics();

  return (
    <Tabs.Content value="urls" asChild>
      {isNavigating ? (
        <TableWithBarChart.Skeleton />
      ) : (
        <Suspense fallback={<TableWithBarChart.Skeleton />}>
          <Await
            resolve={routesByUrlPath}
            errorElement={<TableWithBarChart.Error />}
          >
            {(resolvedRoutesByUrlPath) => {
              return (
                <TableWithBarChart<
                  keyof Awaited<typeof resolvedRoutesByUrlPath>[number]
                >
                  data={routesByUrlPathEvent ?? resolvedRoutesByUrlPath}
                  valueKey="uniqueUserIds"
                  columns={{ routePath: { hidden: true } }}
                  headers={{
                    uniqueUserIds: {
                      className: 'text-right',
                      label: 'Visitors',
                    },
                    urlPath: { label: 'URL' },
                  }}
                  cells={{
                    urlPath: {
                      render: (value, props, cell) => {
                        return (
                          <span {...props}>
                            <UrlRouteDisplay
                              url={`${value}`}
                              route={`${cell.row.original.routePath}`}
                            />
                          </span>
                        );
                      },
                    },
                    uniqueUserIds: {
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
