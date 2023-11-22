import { and, eq, sql } from 'drizzle-orm';

import { db } from '../db';
import { nanoid } from '../modules/nanoid';
import { projects, teams, usersToTeams } from '../schema';
import { NewTeam, Team } from '../types';
import { generateSlug } from '../utils/slugs';
import { buildJsonbObject } from '../utils/buildJsonObject';

export async function insert(newTeam: NewTeam): Promise<Team> {
  const slug = await generateSlug({
    text: newTeam.name || 'projects',
    table: teams,
  });

  const [team] = await db({ write: true })
    .insert(teams)
    .values({ ...newTeam, slug, id: nanoid.id('team') })
    .returning();

  return team;
}

export async function hasAtLeastOneProject({ teamId }: { teamId: string }) {
  const [{ count }] = await db()
    .select({
      count: sql<number>`count(*)::ingeter`,
    })
    .from(projects)
    .where(eq(projects.teamId, teamId));

  return count > 0;
}

export async function findBySlug({
  teamSlug,
  userId,
}: {
  teamSlug: string;
  userId: string;
}): Promise<Team | undefined> {
  const [team] = await db()
    .select()
    .from(teams)
    .leftJoin(usersToTeams, and(eq(usersToTeams.teamId, teams.id), eq(usersToTeams.userId, userId)))
    .where(eq(teams.slug, teamSlug));

  return team?.teams;
}

export async function getProjects({ teamId }: { teamId: string }) {
  const foundProjects = await db()
    .select()
    .from(projects)
    .leftJoin(teams, eq(teams.id, teamId))
    .where(eq(projects.deleted, false));

  return foundProjects.map((project) => project.projects);
}

export async function updateSettings(
  teamId: string,
  settings: Partial<Team['settings']>,
): Promise<Team> {
  const [team] = await db({ write: true })
    .update(teams)
    .set({
      settings: sql`settings::jsonb || ${buildJsonbObject({
        ...settings,
      })}`,
    })
    .where(eq(teams.id, teamId))
    .returning();

  return team;
}
