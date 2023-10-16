import { pageviews, projects, sessions } from '@metronome/db.server';
import { type LoaderFunctionArgs } from '@remix-run/node';

import { filters } from '#app/filters';
import { handle } from '#app/handlers';
import { notFound, stream } from '#app/responses';
import { isRangeWithinToday } from '#app/utils';

import { type loader as webAnalyticsLoader } from './$teamSlug.$projectSlug.web-analytics.route';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { auth, query } = await handle(request);

  const user = await auth.user();

  const { teamSlug = '', projectSlug = '' } = params;

  const project = await projects.findBySlugs({
    teamSlug,
    projectSlug,
    userId: user.id,
  });

  if (!project) throw notFound();

  const { interval, range } = await query.filters({
    interval: filters.interval(),
    range: filters.dateRange(),
  });

  return stream<typeof webAnalyticsLoader>(
    '$teamSlug.$projectSlug.web-analytics',
    request,
    async (send) => {
      if (!isRangeWithinToday(range)) {
        // TODO - be able to return void here
        return () => {};
      }

      const cleanupSessionsWatch = await sessions.watch(
        project,
        async ({ ts }) => {
          const [
            visitorsRightNow,
            sessionsOverview,
            bounceRate,
            overviewSeries,
          ] = await Promise.all([
            sessions.visitorsRightNow(project),
            sessions.overview({
              project,
              range,
              interval,
            }),
            sessions.bounceRate({ project, range, interval }),
            sessions.overviewSeries({ project, range, interval }),
          ]);

          send(
            { visitorsRightNow, sessionsOverview, bounceRate, overviewSeries },
            ts,
          );
        },
      );

      const cleanupPageviewsWatch = await pageviews.watch(
        project,
        async ({ ts }) => {
          const pageviewsOverview = await pageviews.overview({
            project,
            range,
            interval,
          });
          send({ pageviewsOverview }, ts);
        },
      );

      return async function cleanup() {
        cleanupSessionsWatch();
        cleanupPageviewsWatch();
      };
    },
  );
}
