import { projects } from '@metronome/db.server';
import { handle } from '@metronome/utils.server';
import { json, type LoaderFunctionArgs } from '@remix-run/node';

import { Heading } from '#app/components';
import { notFound } from '#app/responses';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { teamSlug = '', projectSlug = '' } = params;

  const { auth } = await handle(request);

  const user = await auth.user();

  const project = await projects.findBySlugs({
    teamSlug,
    projectSlug,
    userId: user.id,
  });

  if (!project) throw notFound();

  return json(null);
}

export default function Component() {
  return (
    <div className="w-full flex-grow h-full">
      <div className="mx-auto w-full max-w-screen-lg rounded-lg">
        <Heading title="Overview" description={`General summary of your app`} />
        <div className="space-y-4 pb-4">
          <div className="w-full h-80 px-4">
            <div className="w-full h-full bg-muted/40 rounded-lg"></div>
          </div>
          <div className="w-full h-80 px-4">
            <div className="w-full h-full bg-muted/40 rounded-lg"></div>
          </div>
          <div className="w-full h-80 px-4">
            <div className="w-full h-full bg-muted/40 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
