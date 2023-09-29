import { teams } from '@metronome/db.server';
import { handle } from '@metronome/utils.server';
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { Container } from '#app/components';
import { notFound } from '#app/responses';

import { TeamsHeader } from './components';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { auth } = await handle(request);

  const user = await auth.user();

  const { teamSlug = '' } = params;

  const team = await teams.get({ teamSlug, userId: user.id });

  if (!team) throw notFound();

  const projects = await teams.getProjects({ teamSlug });

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
