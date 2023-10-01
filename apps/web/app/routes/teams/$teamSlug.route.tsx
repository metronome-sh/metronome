import { teams } from '@metronome/db.server';
import { handle } from '@metronome/utils.server';
import { json, type LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { Container } from '#app/components';
import { notFound } from '#app/responses';

import { TeamsHeader } from './components';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { auth } = await handle(request);

  const user = await auth.user();

  const { teamSlug = '' } = params;

  const team = await teams.findBySlug({ teamSlug, userId: user.id });

  if (!team) throw notFound();

  const pathname = new URL(request.url).pathname;

  const projects = await teams.getProjects({ teamId: team.id });

  if (typeof teamSlug === 'string' && pathname.endsWith(teamSlug)) {
    const lastSelectedProjectSlug = user.settings?.lastSelectedProjectSlug;

    if (
      typeof lastSelectedProjectSlug === 'string' &&
      lastSelectedProjectSlug !== ''
    ) {
      throw redirect(`/${teamSlug}/${lastSelectedProjectSlug}/overview`);
    }

    if (projects.length === 0) throw redirect(`/${teamSlug}/create`);

    throw redirect(`/${teamSlug}/${projects.at(0)!.slug}/overview`);
  }

  return json({ team, projects });
}

export default function Component() {
  return (
    <Container>
      <TeamsHeader />
      <Outlet />
    </Container>
  );
}
