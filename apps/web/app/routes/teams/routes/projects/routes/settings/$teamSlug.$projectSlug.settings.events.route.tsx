import { Temporal } from '@js-temporal/polyfill';
import { projects, usages } from '@metronome/db.server';
import { handle } from '@metronome/utils.server';
import { type LoaderFunctionArgs } from '@remix-run/node';

import { notFound, stream } from '#app/responses';

import { type loader as settingsLoader } from './$teamSlug.$projectSlug.settings.route';

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

  // TODO get the billing cycle instead of the month
  const range = {
    from: Temporal.Now.instant()
      .toZonedDateTimeISO('UTC')
      .withPlainTime('00:00:00')
      .add({
        days: -(Temporal.Now.instant().toZonedDateTimeISO('UTC').day - 1),
      }),
    to: Temporal.Now.instant()
      .toZonedDateTimeISO('UTC')
      .withPlainTime('23:59:59'),
  };

  return stream<typeof settingsLoader>(
    '$teamSlug.$projectSlug.settings',
    request,
    async (send) => {
      // const cleanupProjectUsage = await usages.watch(
      //   { project },
      //   async ({ ts }) => {
      //     const usage = await usages.project({ project, range });
      //     send({ usage }, ts);
      //   },
      // );

      const interval = setInterval(async () => {
        const usage = await usages.project({ projectId: project.id, range });
        send({ usage }, Temporal.Now.instant().epochSeconds);
      }, 5000);

      return async function cleanup() {
        clearInterval(interval);
        // await Promise.allSettled([cleanupProjectUsage()]);
      };
    },
  );
}
