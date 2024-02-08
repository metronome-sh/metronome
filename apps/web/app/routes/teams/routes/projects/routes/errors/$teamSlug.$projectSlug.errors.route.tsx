import { projects, errors } from '@metronome/db';
import { defer, LoaderFunctionArgs } from '@remix-run/node';
import { invariant } from 'ts-invariant';

import { Breadcrumb, Heading, NotificationsOutlet } from '#app/components';
import { Filters, filters } from '#app/filters';
import { handle } from '#app/handlers/handle';
import { notFound } from '#app/responses';
import { useLoaderData } from '@remix-run/react';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { teamSlug = '', projectSlug = '' } = params;

  invariant(teamSlug, 'teamSlug should be defined');
  invariant(projectSlug, 'projectSlug should be defined');

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

  const projectErrors = errors.all({ project });

  // const webVitalsOverview = webVitals.overview({
  //   project,
  //   range,
  //   interval,
  // });

  // const webVitalsBreakdownByRoute = webVitals.breakdownByRoute({
  //   project,
  //   range,
  //   interval,
  // });

  // return defer({
  //   webVitalsOverview,
  //   webVitalsBreakdownByRoute,
  // });

  return defer({ projectErrors: await projectErrors });
}

export default function Component() {
  const test = useLoaderData();

  console.log({ test });

  return (
    <div className="w-full flex-grow h-full">
      <Breadcrumb>Errors</Breadcrumb>
      <div className="mx-auto w-full rounded-lg">
        <NotificationsOutlet />
        <Heading
          title="Errors"
          description="Client and server errors."
          separatorClassName="md:mb-4"
        />
      </div>
      <div className="pb-2">
        {/* <Filters filters={[filters.dateRange(), filters.interval()]} /> */}
      </div>
      <div className="pt-4 px-4">
        {/* <WebVitalsSection />
        <WebVitalsByRouteSection /> */}
      </div>
    </div>
  );
}
