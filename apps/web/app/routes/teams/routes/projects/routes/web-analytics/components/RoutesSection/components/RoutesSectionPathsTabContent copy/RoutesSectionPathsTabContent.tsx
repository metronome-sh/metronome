import { Suspense, type FunctionComponent } from 'react';
import { cn } from '#app/components/utils';
import { useMetronomeLoaderData } from '#app/hooks/useMetronomeLoaderData';
import { TableWithBarChart } from '#app/components/TableWithBarChart';
import { Await } from '@remix-run/react';
import { useIsNavigatingWebAnalylics } from '../../../../hooks/useIsNavigatingWebAnalylics';
import { z } from 'zod';
import { useEventValueSchema } from '#app/events';
import { useAsyncValueSchema } from '#app/hooks/useAsyncValueSchema';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '#app/components/ui/tooltip';
import { formatNumber } from '#app/utils';
import { RouteDisplay } from '#app/components/RouteDisplay';

export const RoutesSectionPathsTabContent: FunctionComponent = () => {
  const data = useMetronomeLoaderData('routesList');

  const isNavigating = useIsNavigatingWebAnalylics();

  if (isNavigating) {
    return <TableWithBarChart.Skeleton />;
  }

  return (
    <Suspense fallback={<TableWithBarChart.Skeleton />}>
      <Await resolve={data} errorElement={<TableWithBarChart.Error />}>
        <RoutesSectionPathsTabContentResolved />
      </Await>
    </Suspense>
  );
};

const LocationsByCityDatumSchema = z.object({
  route: z.string(),
  count: z.number(),
});

const LocationsByCitySchema = z.array(LocationsByCityDatumSchema);

const RoutesSectionPathsTabContentResolved: FunctionComponent = () => {
  const asyncValue = useAsyncValueSchema(LocationsByCitySchema);

  const eventValue = useEventValueSchema(
    'project:sessions-locations-by-city',
    LocationsByCitySchema,
  );

  const locationsByCity = eventValue ?? asyncValue;

  return (
    <TableWithBarChart<keyof z.infer<typeof LocationsByCityDatumSchema>>
      data={locationsByCity}
      valueKey="count"
      headers={{ count: { className: 'text-right', label: 'Visitors' } }}
      cells={{
        route: {
          render: (value, props) => {
            return (
              <span {...props}>
                <RouteDisplay route={`${value}`} />
              </span>
            );
          },
        },
        count: {
          render: (value, { className, ...props }) => (
            <div className={cn(className, 'text-right')} {...props}>
              {(value as number) < 1000 ? (
                value.toLocaleString()
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger disabled={(value as number) < 1000}>
                      {formatNumber(value as number)}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{value.toLocaleString()}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          ),
        },
      }}
    />
  );
};
