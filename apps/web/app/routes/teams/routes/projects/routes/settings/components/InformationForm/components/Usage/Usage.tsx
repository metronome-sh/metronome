import { type FunctionComponent } from 'react';

import { Label } from '#app/components';

// import { useSettingsLoaderData } from '../../../../hooks';

export const Usage: FunctionComponent = () => {
  // const { usage } = useSettingsLoaderData();
  // TODO fix bigints that are being passed in as strings to the client
  // const { usage: usageEvent } = useSettingsEventData();

  return (
    <div>
      <Label className="flex gap-1">
        Usage{' '}
        <span className="inline-block text-xs pt-0.5">
          <span className="relative flex">
            <span className="flex items-center text-green-600 animate-ping absolute inset-0">
              {/* <FontAwesomeIcon icon={faCircleSmall} /> */}
            </span>
            <span className="flex items-center text-green-600">
              {/* <FontAwesomeIcon icon={faCircleSmall} /> */}
            </span>
          </span>
        </span>
      </Label>
      {/* <Suspense
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
          {(usage: string) => {
            const usageBigInt = BigInt(usageEvent ?? usage);

            return (
              <div className="text-sm py-1">
                <span className="">{usageBigInt.toLocaleString()}</span> events
              </div>
            );
          }}
        </Await>
      </Suspense> */}
      <p className="text-[0.8rem] text-muted-foreground">
        Your project usage during this billing period.
      </p>
    </div>
  );
};
