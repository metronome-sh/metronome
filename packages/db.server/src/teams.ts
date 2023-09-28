import { db, id } from './db';
import { generateSlug } from './helpers/slugs';
import { teams } from './schema';
import { NewTeam, Team } from './types';

export async function create(newTeam: NewTeam = {}): Promise<Team> {
  const slug = await generateSlug({
    text: newTeam.name || 'projects',
    table: teams,
  });

  const [team] = await db({ writable: true })
    .insert(teams)
    .values({ ...newTeam, slug, id: id('team') })
    .returning();

  return team;
}
