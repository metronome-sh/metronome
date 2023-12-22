import { projects } from '@metronome/db.server';
import { type LoaderFunctionArgs } from '@remix-run/node';

import { handle } from '#app/handlers';
import { notFound, stream } from '#app/responses';

import { type loader as teamSlugProjectSlugLoader } from './$teamSlug.$projectSlug.route';
import { checkForProjectClientUpdates } from '#app/utils';
import { invariant } from 'ts-invariant';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { auth } = await handle(request);

  const user = await auth.user();

  const { teamSlug = '', projectSlug = '' } = params;

  const project = await projects.findBySlugs({
    teamSlug,
    projectSlug,
    userId: user.id,
  });

  if (!project) throw notFound();

  return stream<typeof teamSlugProjectSlugLoader>(
    '$teamSlug.$projectSlug',
    request,
    async (send) => {
      const cleanupProjectSemVer = await projects.watch(project, async ({ ts }) => {
        const updatedProject = await projects.find(project.id);

        invariant(updatedProject, `Cannot find project with id ${project.id}`);

        const semver = await checkForProjectClientUpdates(updatedProject.clientVersion ?? '0.0.0');
        send({ semver }, ts);
      });

      return async function cleanup() {
        await cleanupProjectSemVer();
      };
    },
  );
}
