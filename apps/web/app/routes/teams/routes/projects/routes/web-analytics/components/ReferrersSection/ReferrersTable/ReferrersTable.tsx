import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { TableWithBarChart, Tooltip } from '#app/components';
import { cn } from '#app/components/utils';
import { formatNumber } from '#app/utils';

import {
  useIsNavigatingWebAnalytics,
  useWebAnalyticsEventData,
  useWebAnalyticsLoaderData,
} from '../../../hooks';

export const ReferrersTable: FunctionComponent = () => {
  const { referrers } = useWebAnalyticsLoaderData();
  const { referrers: referrersEvent } = useWebAnalyticsEventData();

  const isNavigating = useIsNavigatingWebAnalytics();

  if (isNavigating) {
    return <TableWithBarChart.Skeleton />;
  }

  return (
    <Suspense fallback={<TableWithBarChart.Skeleton />}>
      <Await resolve={referrers} errorElement={<TableWithBarChart.Error />}>
        {(resolvedReferrers) => {
          return (
            <TableWithBarChart<keyof Awaited<typeof resolvedReferrers>[number]>
              data={referrersEvent ?? resolvedReferrers}
              valueKey="uniqueUserIds"
              headers={{
                referrerDomain: { hidden: true },
                uniqueUserIds: { className: 'text-right', label: 'Visitors' },
                name: { label: 'Source' },
              }}
              cells={{
                name: {
                  className: 'capitalize',
                  render: (value, props) => {
                    return <div {...props}>{value ? value : 'Unknown'}</div>;
                  },
                },
                referrerDomain: {
                  size: 32,
                  render: (value, props) => {
                    return (
                      <div
                        {...props}
                        className={cn(props.className, 'relative ml-1')}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          {value ? (
                            <img
                              src={`/resources/favicon?url=${value}`}
                              alt="icon"
                              className="h-5"
                            />
                          ) : (
                            <span className="text-lg">🌎</span>
                          )}
                        </div>
                      </div>
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
  );
};
