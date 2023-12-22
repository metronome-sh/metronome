import { projects, users } from '@metronome/db.server';
import { type LoaderFunctionArgs, redirect, defer } from '@remix-run/node';
import { Await, Outlet } from '@remix-run/react';

import { Breadcrumb } from '#app/components';
import { handle } from '#app/handlers';
import { notFound } from '#app/responses';
import { checkForProjectClientUpdates } from '#app/utils';

import { ProjectSelector } from '../../components';
import { Navigation, VersionNotification } from './components';
import { useTeamProjectLoaderData } from './hooks';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { teamSlug = '', projectSlug = '' } = params;

  const pathname = new URL(request.url).pathname;

  if (typeof projectSlug === 'string' && pathname.endsWith(projectSlug)) {
    throw redirect(`/${teamSlug}/${projectSlug}/overview`);
  }

  const { auth } = await handle(request);

  const user = await auth.user();

  const project = await projects.findBySlugs({
    teamSlug,
    projectSlug,
    userId: user.id,
  });

  if (!project) throw notFound();

  if (user.settings?.lastSelectedProjectSlug !== project.slug) {
    await users.lastSelectedProjectSlug({ projectSlug, userId: user.id });
  }

  const semver = checkForProjectClientUpdates(project.clientVersion || '0.0.0');

  return defer({ project, semver });
}

export default function Component() {
  return (
    <div className="flex flex-col flex-grow">
      <Breadcrumb>
        <ProjectSelector />
      </Breadcrumb>
      <Navigation />
      <VersionNotification />
      <div className="mx-auto w-full h-full flex-grow flex flex-col max-w-screen-xl px-4">
        <Outlet />
      </div>
    </div>
  );
}
