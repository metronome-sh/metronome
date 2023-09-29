import { and, eq } from 'drizzle-orm';

import { db, id } from './db';
import { generateSlug } from './helpers/slugs';
import { projects, teams, usersToTeams } from './schema';
import { NewProject, Project } from './types';

export async function create(newProject: NewProject) {
  const slug = await generateSlug({
    text: newProject.name || 'projects',
    table: projects,
  });

  const [project] = await db({ writable: true })
    .insert(projects)
    .values({
      id: id('project'),
      apiKey: id('apiKey', 30),
      slug,
      ...newProject,
    })
    .returning();

  return project;
}

export async function get({
  projectSlug,
  teamSlug,
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
    .where(eq(projects.slug, projectSlug));

  return project?.projects;
}
