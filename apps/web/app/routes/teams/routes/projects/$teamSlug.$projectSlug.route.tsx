import { projects } from '@metronome/db.server';
import { handle } from '@metronome/utils.server';
import { json, type LoaderFunctionArgs } from '@remix-run/node';

import { Button, Container, Header, Heading, Icon } from '#app/components';
import { notFound } from '#app/responses';

import { Navigation } from './components';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { auth } = await handle(request);

  const user = await auth.user();

  const { teamSlug = '', projectSlug = '' } = params;

  const project = await projects.get({
    teamSlug,
    projectSlug,
    userId: user.id,
  });

  if (!project) throw notFound();

  return json({ project });
}

export default function Component() {
  //   <Header
  //   breadcrumbs={[
  //     <Button
  //       key="project"
  //       size="sm"
  //       variant="ghost"
  //       className="text-sm transition-colors hover:text-primary hover:bg-muted px-2 py-1 rounded-md space-x-2"
  //     >
  //       <div className="h-4 w-4 bg-zinc-500 rounded-full" />
  //       <span>Awesome Project</span>
  //       <Icon.CaretDownFilled className="opacity-40" />
  //     </Button>,
  //     <div key="overview" className="text-sm">
  //       Overview
  //     </div>,
  //   ]}
  // />

  return (
    <div className="flex flex-grow">
      <Navigation />
      <div className="w-full flex-grow pl-4">
        <div className="w-full h-full bg-zinc-50 dark:bg-zinc-950 rounded-lg">
          <Heading
            title="Overview"
            description={`General summary of your app`}
          />
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
    </div>
  );
}
