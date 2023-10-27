import { and, eq, sql } from 'drizzle-orm';

import { db } from '../db';
import { nanoid } from '../modules/nanoid';
import { projects, teams, usersToTeams } from '../schema';
import { NewProject, Project, UpdateProjectAttributes } from '../types';
import { observable, operators, throttleTime } from '../utils/events';
import { generateSlug } from '../utils/slugs';

export async function insert(newProject: NewProject) {
  const slug = await generateSlug({
    text: newProject.name || 'projects',
    table: projects,
  });

  const [project] = await db({ write: true })
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
}): Promise<Project> {
  const [project] = await db({ write: true })
    .update(projects)
    .set({ ...attributes, updatedAt: new Date() })
    .where(and(eq(projects.id, id), eq(projects.deleted, false)))
    .returning();

  return project;
}

export async function destroy({ id }: { id: string }) {
  await db({ write: true })
    .update(projects)
    .set({ deleted: true, updatedAt: new Date() })
    .where(eq(projects.id, id));
}

export async function find(id: string) {
  const project = await db().query.projects.findFirst({
    where: (projects, { eq, and }) => {
      return and(eq(projects.id, id), eq(projects.deleted, false));
    },
  });

  return project;
}

export async function findByApiKey({
  apiKey,
}: {
  apiKey: string;
}): Promise<Project | undefined> {
  const [project] = await db()
    .select()
    .from(projects)
    .where(and(eq(projects.apiKey, apiKey), eq(projects.deleted, false)))
    .limit(1);

  return project;
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
  await db({ write: true })
    .update(projects)
    .set({ apiKey: nanoid.id('apiKey', 30), updatedAt: new Date() })
    .where(and(eq(projects.id, id), eq(projects.deleted, false)));
}

export async function rotateSalts() {
  await db({ write: true })
    .update(projects)
    .set({
      previousSalt: sql`salt`,
      salt: sql`substr(md5(random()::text),0,33)`,
      updatedAt: new Date(),
    })
    .where(and(eq(projects.deleted, false)));
}

export async function watch(
  project: Project,
  callback: (event: { ts: number }) => Promise<void>,
): Promise<() => void> {
  await callback({ ts: Date.now() });

  const subscription = observable
    .pipe(
      operators.project(project),
      operators.events(['first-event']),
      throttleTime(1000, undefined, { leading: true, trailing: true }),
    )
    .subscribe(async ([e]) => {
      await callback({ ts: e.returnvalue.ts });
    });

  return () => subscription.unsubscribe();
}
