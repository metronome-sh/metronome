import { Breadcrumb, Heading, NotificationsOutlet } from '#app/components';
import { defer, useParams } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { invariant } from 'ts-invariant';
import { handle } from '#app/handlers/handle';
import { errors, projects, sourcemaps, events } from '@metronome/db';
import { notFound } from '#app/responses/notFound';
import { useErrorHashLoaderData } from './hooks/useErrorHashLoaderData';
import { Sources } from './components/Sources';
import { Event } from './components/Event';
import { Error } from './components/Error';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { teamSlug = '', projectSlug = '', hash = '' } = params;

  invariant(teamSlug, 'teamSlug should be defined');
  invariant(projectSlug, 'projectSlug should be defined');
  invariant(hash, 'hash should be defined');

  const { auth, query } = await handle(request);

  const user = await auth.user();

  const project = await projects.findBySlugs({
    teamSlug,
    projectSlug,
    userId: user.id,
  });

  if (!project) throw notFound();

  const error = await errors.findByHash({ project, hash });

  if (!error) throw notFound();

  const sources = sourcemaps.getSourcesFromStackTrace({
    project,
    version: error.versions.at(-1)!,
    stacktrace: error.stacktrace,
    hash,
  });

  const event = events.find({ project, id: error.eventIds.at(-1)! });

  return defer({ error, sources, event });
}

export default function Hash() {
  const { hash } = useParams();
  const { error } = useErrorHashLoaderData();

  return (
    <div className="w-full flex-grow flex flex-col">
      <Breadcrumb link="../errors">Errors</Breadcrumb>
      <Breadcrumb>{hash?.slice(0, 8)}</Breadcrumb>
      <div className="mx-auto w-full rounded-lg">
        <NotificationsOutlet />
        <Heading title={error.name} description={error.message} separatorClassName="md:mb-4" />
      </div>
      <div className="space-y-4">
        <Error />
        <Event />
        <Sources />
      </div>
    </div>
  );
}
