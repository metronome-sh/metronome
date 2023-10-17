import { pageviews, projects, sessions } from '@metronome/db.server';
import { defer, LoaderFunctionArgs } from '@remix-run/node';

import { Heading } from '#app/components';
import { Filters, filters } from '#app/filters';
import { handle } from '#app/handlers';
import { notFound } from '#app/responses';

import { GeneralWebAnalyticsSection, LocationsSection } from './components';
import { RoutesSection } from './components/RoutesSection';

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

  const visitorsRightNow = sessions.visitorsRightNow(project);

  const sessionsOverview = sessions.overview({
    project,
    range,
    interval,
  });

  const pageviewsOverview = pageviews.overview({
    project,
    range,
    interval,
  });

  const bounceRate = sessions.bounceRate({ project, range, interval });

  const bounceRateSeries = sessions.bounceRateSeries({
    project,
    range,
    interval,
  });

  const overviewSeries = sessions.overviewSeries({
    project,
    range,
    interval,
  });

  const locationsByCountry = sessions.countries({ project, range, interval });

  const locationsByCity = sessions.cities({ project, range, interval });

  const routesByRoutePath = pageviews.routesByRoutePath({
    project,
    range,
    interval,
  });

  const routesByUrlPath = pageviews.routesByUrlPath({
    project,
    range,
    interval,
  });

  return defer({
    visitorsRightNow,
    sessionsOverview,
    pageviewsOverview,
    bounceRate,
    bounceRateSeries,
    overviewSeries,
    locationsByCountry,
    locationsByCity,
    routesByRoutePath,
    routesByUrlPath,
  });
}

export default function Component() {
  return (
    <div className="w-full flex-grow h-full">
      <div className="mx-auto w-full rounded-lg">
        <Heading
          title="Web Analytics"
          description="Understand client performance and user behavior."
          separatorClassName="md:mb-4"
        />
      </div>
      <div className="pb-2">
        <Filters filters={[filters.dateRange(), filters.interval()]} />
      </div>
      <div className="pt-4 px-4">
        <GeneralWebAnalyticsSection />
        <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
          <LocationsSection />
          <RoutesSection />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* <ReferrersSection /> */}
          {/* <DevicesSection /> */}
        </div>
      </div>
    </div>
  );
}
