import { Await } from '@remix-run/react';
import { type FunctionComponent, Suspense } from 'react';

import { Icon, Label, Ping } from '#app/components';

import { useSettingsEventData, useSettingsLoaderData } from '../../../../hooks';

// import { useSettingsLoaderData } from '../../../../hooks';

export const Usage: FunctionComponent = () => {
  // const { usage } = useSettingsLoaderData();
  // TODO fix bigints that are being passed in as strings to the client
  // const { usage: usageEvent } = useSettingsEventData();

  const { usage } = useSettingsLoaderData();
  const { usage: usageEvent } = useSettingsEventData();

  return (
    <div>
      <Label className="flex gap-1 items-center">
        Usage <Ping className="h-2 w-2" />
      </Label>
      <Suspense
        fallback={
          <div className="text-xs py-1 w-30">
            <div className="text-transparent pointer-events-none animate-pulse bg-muted-foreground/10 rounded-lg my-0.5">
              000000
            </div>
          </div>
        }
      >
        <Await
          resolve={usage}
          errorElement={
            <div className="text-sm py-1 text-destructive space-x-1">
              <Icon.AlertTriangleFilled />
              <span className="text-xs">Error fetching project usage</span>
            </div>
          }
        >
          {(resolvedUsage) => {
            const usageBigInt = BigInt(usageEvent ?? resolvedUsage);

            return (
              <div className="text-sm py-1">
                <span className="tabular-nums font-semibold">
                  {usageBigInt.toLocaleString()}
                </span>{' '}
                events
              </div>
            );
          }}
        </Await>
      </Suspense>
      <p className="text-[0.8rem] text-muted-foreground">
        Your project usage during this billing period.
      </p>
    </div>
  );
};
