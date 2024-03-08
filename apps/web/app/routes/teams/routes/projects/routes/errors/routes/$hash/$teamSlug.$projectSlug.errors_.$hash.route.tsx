import { Breadcrumb, Heading, NotificationsOutlet } from '#app/components';
import { defer, json, useParams } from '@remix-run/react';
import { Code } from './components/Code';
import { LoaderFunctionArgs } from '@remix-run/node';
import { invariant } from 'ts-invariant';
import { handle } from '#app/handlers/handle';
import { errors, projects } from '@metronome/db';
import { notFound } from '#app/responses/notFound';

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

  return json({ error });
}

export default function Hash() {
  const { hash } = useParams();

  return (
    <div className="w-full flex-grow flex flex-col">
      <Breadcrumb link="../errors">Errors</Breadcrumb>
      <Breadcrumb>{hash?.slice(0, 8)}</Breadcrumb>
      <div className="mx-auto w-full rounded-lg">
        <NotificationsOutlet />
        <Heading
          title="Error"
          description={
            <span className="space-y-2">
              <span className="block text-base">This is an example Remix exception</span>
              <span className="block border w-fit rounded-md px-2 divide-x">
                <span className="inline-block py-1 pr-2 text-white">Error id: </span>
                <span className="inline-block py-1 text-muted-foreground pl-2">{hash}</span>
              </span>
            </span>
          }
          separatorClassName="md:mb-4"
        />
      </div>
      <Code />
    </div>
  );
}
