import { useFetcher, useParams } from '@remix-run/react';
import { type FunctionComponent, useState } from 'react';

import { Button, Dialog, Icon, Tooltip } from '#app/components';

// import { Loadable } from '~/components/Loadable';
// import { useFetcherState } from '~/hooks/useFetcherState';

export const RotateApiKey: FunctionComponent<{
  initialDialogOpen?: boolean;
}> = ({ initialDialogOpen = false }) => {
  const { teamSlug, projectSlug } = useParams();

  const fetcher = useFetcher();

  const [showRotateApiKeyDialog, setShowRotateApiKeyDialog] =
    useState(initialDialogOpen);

  // const state = useFetcherState(fetcher);

  return (
    <div>
      <Dialog
        open={showRotateApiKeyDialog}
        onOpenChange={(open) => {
          // if (state === 'loading') return;
          setShowRotateApiKeyDialog(open);
        }}
      >
        <Tooltip.Provider>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0"
                onClick={() => setShowRotateApiKeyDialog(true)}
              >
                <Icon.Refresh />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>Rotate API key</p>
            </Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Rotate API Key</Dialog.Title>
            <Dialog.Description>
              Please confirm you want to rotate the API key for this project.
              You will need to update your{' '}
              <span className="inline mx-0.5 font-mono bg-muted rounded px-1">
                METRONOME_API_KEY
              </span>{' '}
              for Metronome to continue procesing your app data.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer className="gap-2 md:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowRotateApiKeyDialog(false)}
              // disabled={state === 'loading'}
            >
              Cancel
            </Button>
            <Button
              className="md:w-40"
              variant="default"
              // disabled={state === 'loading'}
              onClick={() => {
                fetcher.submit(
                  {},
                  {
                    method: 'POST',
                    action: `/${teamSlug}/${projectSlug}/settings?index&intent=rotateApiKey`,
                  },
                );
              }}
            >
              Rotate API Key
              {/* <Loadable state={state}>Rotate API Key</Loadable> */}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};
