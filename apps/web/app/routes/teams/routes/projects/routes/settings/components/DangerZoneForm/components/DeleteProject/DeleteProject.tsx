import { useFetcher, useParams } from '@remix-run/react';
import { type FunctionComponent, useState } from 'react';

import { Alert, Button, Dialog, Icon } from '#app/components';
import { useTeamLoaderData } from '#app/routes/teams/hooks';
// import { Loadable } from '~/components/Loadable';
// import { useFetcherState } from '~/hooks/useFetcherState';

export const DeleteProject: FunctionComponent<{
  initialDialogOpen?: boolean;
}> = ({ initialDialogOpen }) => {
  const { projects } = useTeamLoaderData();

  const { teamSlug, projectSlug } = useParams();

  const [showDeleteProjectDialog, setShowDeleteProjectDialog] =
    useState(initialDialogOpen);

  const fetcher = useFetcher();

  // const state = useFetcherState(fetcher);

  return (
    <Dialog
      open={showDeleteProjectDialog}
      onOpenChange={(open) => {
        // if (state === 'loading') return;
        setShowDeleteProjectDialog(open);
      }}
    >
      <Button
        variant="destructive"
        onClick={() => setShowDeleteProjectDialog(true)}
      >
        Delete Project
      </Button>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Delete Project</Dialog.Title>
          <Dialog.Description>
            Please confirm you want to delete this project. The project usage
            will still count in your monthly usage calculations.
            {projects.length === 1 ? (
              <Alert className="mt-3">
                <Icon.InfoSquareRounded />
                <Alert.Title>Note</Alert.Title>
                <Alert.Description>
                  As you only have one project in this team, when you delete
                  this project, Metronome will automatically create a new empty
                  project for you.
                </Alert.Description>
              </Alert>
            ) : null}
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer className="gap-2 md:gap-0">
          <Button
            variant="outline"
            onClick={() => setShowDeleteProjectDialog(false)}
            // disabled={state === 'loading'}
          >
            Cancel
          </Button>
          <Button
            className="md:w-20"
            variant="destructive"
            // disabled={state === 'loading'}
            onClick={() => {
              fetcher.submit(
                {},
                {
                  method: 'post',
                  action: `/${teamSlug!}/${projectSlug}/settings?index&intent=delete`,
                },
              );
            }}
          >
            Delete
            {/* <Loadable state={state}>Delete</Loadable> */}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
