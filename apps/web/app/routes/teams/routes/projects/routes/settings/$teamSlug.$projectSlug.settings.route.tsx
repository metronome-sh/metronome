import { Temporal } from '@js-temporal/polyfill';
import { type Project, projects, teams, usages } from '@metronome/db.server';
import { handle } from '@metronome/utils.server';
// import { usages } from '@metronome/telemetry.server';
import {
  type ActionFunctionArgs,
  defer,
  json,
  type LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { z } from 'zod';

import { Heading } from '#app/components';
import { notFound } from '#app/responses';
import { namedAction } from '#app/utils';

// import { handlers } from '~/handlers';
// import { failed } from '~/modules/assertions';
// import { nanoid } from '~/modules/nanoid';
// import { notFound } from '~/responses';
// import { CreateProjectSchema, ProjectVisibilitySchema } from '~/schemas';
// import { Page } from '../../components/Page';
import { DangerZoneForm } from './components/DangerZoneForm';
import { GeneralSettingsForm } from './components/GeneralSettingsForm';
import { InformationForm } from './components/InformationForm';

export const CreateProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  url: z.string().url().or(z.literal('')),
});

export type CreateProjectSchemaType = z.infer<typeof CreateProjectSchema>;

export const ProjectVisibilitySchema = z.object({
  visible: z
    .union([z.boolean(), z.literal('true'), z.literal('false')])
    .transform((value) =>
      typeof value === 'boolean' ? value : value === 'true',
    )
    .refine((value) => typeof value === 'boolean', {
      message: 'Visible must be a boolean',
    }),
});

export type ProjectVisibilitySchemaType = z.infer<
  typeof ProjectVisibilitySchema
>;

export async function action({ request, params }: ActionFunctionArgs) {
  const { auth, form } = await handle(request);

  const user = await auth.user();

  const { teamSlug = '', projectSlug = '' } = params;

  const project = await projects.findBySlugs({
    teamSlug,
    projectSlug,
    userId: user.id,
  });

  if (!project) return notFound();

  return namedAction(request, {
    async general() {
      const { name, url } = await form.validate(CreateProjectSchema);

      await projects
        .update({ id: project.id, attributes: { name, url } })
        .catch(() => {
          throw json({ success: false });
        });

      return json({ success: true });
    },
    async visibility() {
      const { visible } = await form.validate(ProjectVisibilitySchema);

      await projects
        .update({ id: project.id, attributes: { isPublic: visible } })
        .catch(() => {
          throw json({ success: false });
        });

      return json({ success: true });
    },
    async rotateApiKey() {
      await projects.rotateApiKey({ id: project.id }).catch(() => {
        throw json({ success: false });
      });

      return json({ success: true });
    },
    async delete() {
      const teamProjects = await teams.getProjects({ teamId: project.teamId });

      await projects.destroy({ id: project.id });

      let projectToRedirectTo: Project;

      if (teamProjects.length === 1) {
        projectToRedirectTo = await projects.create({
          teamId: project.teamId,
          name: 'New Project',
        });
      } else {
        projectToRedirectTo = teamProjects.find((p) => p.id !== project.id)!;
      }

      return redirect(`/${teamSlug}/${projectToRedirectTo.slug}/overview`);
    },
    async default() {
      return notFound();
    },
  });
}

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

  const usage = usages.project({ projectId: project.id, range });

  return defer({ usage });
}

export default function Route() {
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage your project configuration."
      />
      <div className="max-w-screen-sm mx-auto space-y-12">
        <GeneralSettingsForm />
        {/* <VisibilityForm /> */}
        <InformationForm />
        <DangerZoneForm />
      </div>
    </div>
  );
}
