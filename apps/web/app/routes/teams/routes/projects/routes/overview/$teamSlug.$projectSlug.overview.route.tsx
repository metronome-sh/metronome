import { actions, loaders, projects, requests } from '@metronome/db.server';
import { defer, type LoaderFunctionArgs } from '@remix-run/node';

import { Heading } from '#app/components';
import { Filters, filters } from '#app/filters';
import { handle } from '#app/handlers';
import { notFound } from '#app/responses';

import { ActionsSection, LoadersSection, RequestsSection } from './components';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { teamSlug = '', projectSlug = '' } = params;

  const { auth, query } = await handle(request);

  const user = await auth.user();

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

  const requestsOverview = requests.overview({
    project,
    interval,
    range,
  });

  const requestsCountSeries = requests.countSeries({
    project,
    interval,
    range,
  });

  const loadersOverview = loaders.overview({ project, range, interval });

  const loadersOverviewSeries = loaders.overviewSeries({
    project,
    range,
    interval,
  });

  const actionsOverview = actions.overview({ project, range, interval });

  const actionsOverviewSeries = actions.overviewSeries({
    project,
    range,
    interval,
  });

  return defer({
    requestsOverview,
    requestsCountSeries,
    loadersOverview,
    loadersOverviewSeries,
    actionsOverview,
    actionsOverviewSeries,
  });
}

export default function Component() {
  return (
    <div className="w-full flex-grow h-full">
      <div className="mx-auto w-full max-w-screen-lg rounded-lg">
        <Heading
          title="Overview"
          description={`General summary of your app`}
          separatorClassName="md:mb-4"
        />
        <div className="pb-2">
          <Filters filters={[filters.dateRange(), filters.interval()]} />
        </div>
        <div className="px-2">
          <RequestsSection />
          <LoadersSection />
          <ActionsSection />
        </div>
      </div>
    </div>
  );
}
