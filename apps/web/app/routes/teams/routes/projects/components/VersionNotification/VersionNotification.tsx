import { FunctionComponent } from 'react';
import { Alert, Icon, Notification } from '#app/components';

import { Suspense } from 'react';
import { Await } from '@remix-run/react';
import { useTeamProjectEventData, useTeamProjectLoaderData } from '../../hooks';

export const VersionNotification: FunctionComponent = () => {
  const { semver, project } = useTeamProjectLoaderData();
  const { semver: semverEvent } = useTeamProjectEventData();

  return (
    <Suspense>
      <Await resolve={semver}>
        {(resolvedSemver) => {
          const doesNotNeedToUpdate =
            !resolvedSemver.needsToUpdate ||
            (semverEvent !== undefined && !semverEvent.needsToUpdate);

          if (doesNotNeedToUpdate) return null;

          return (
            <Notification
              render={() => {
                return (
                  <Alert>
                    <Icon.AlertSquareRoundedOutline />
                    <Alert.Description className="pt-1.5">
                      Your app is using an older version of the Metronome client{' '}
                      <span className="rounded bg-yellow-900 border border-yellow-500 font-medium text-yellow-500 px-1">
                        {project.clientVersion || 'unknown'}
                      </span>
                      . Please update it to the latest version:{' '}
                      <span className="rounded bg-emerald-900 border border-emerald-500 font-medium text-emerald-500 px-1">
                        {resolvedSemver.latestClientVersion}
                      </span>
                      .
                    </Alert.Description>
                  </Alert>
                );
              }}
            />
          );
        }}
      </Await>
    </Suspense>
  );
};
