import { and, eq } from 'drizzle-orm';

import { db } from './db';
import { generateSlug } from './helpers/slugs';
import { nanoid } from './modules/nanoid';
import { projects, teams, usersToTeams } from './schema';
import { NewProject, Project, UpdateProjectAttributes } from './types';

export async function create(newProject: NewProject) {
  const slug = await generateSlug({
    text: newProject.name || 'projects',
    table: projects,
  });

  const [project] = await db({ writable: true })
    .insert(projects)
    .values({
      id: nanoid.id('project'),
      apiKey: nanoid.id('apiKey', 30),
      slug,
      ...newProject,
    })
    .returning();

  return project;
}

export async function update({
  id,
  attributes,
}: {
  id: string;
  attributes: UpdateProjectAttributes;
}) {
  await db({ writable: true })
    .update(projects)
    .set({ ...attributes, updatedAt: new Date() })
    .where(and(eq(projects.id, id), eq(projects.deleted, false)));
}

export async function destroy({ id }: { id: string }) {
  await db({ writable: true })
    .update(projects)
    .set({ deleted: true, updatedAt: new Date() })
    .where(eq(projects.id, id));
}

export async function findBySlugs({
  teamSlug,
  projectSlug,
  userId,
}: {
  projectSlug: string;
  teamSlug: string;
  userId: string;
}): Promise<Project | undefined> {
  const [project] = await db()
    .select()
    .from(projects)
    .leftJoin(teams, eq(teams.id, projects.teamId))
    .leftJoin(
      usersToTeams,
      and(
        eq(usersToTeams.teamId, teams.id),
        eq(usersToTeams.userId, userId),
        eq(teams.slug, teamSlug),
      ),
    )
    .where(and(eq(projects.slug, projectSlug), eq(projects.deleted, false)));

  return project?.projects;
}

export async function rotateApiKey({ id }: { id: string }) {
  await db({ writable: true })
    .update(projects)
    .set({ apiKey: nanoid.id('apiKey', 30), updatedAt: new Date() })
    .where(and(eq(projects.id, id), eq(projects.deleted, false)));
}