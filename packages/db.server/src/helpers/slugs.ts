import { eq, sql } from 'drizzle-orm';
import { db } from '../db';
import { slugify } from '../modules/slugify';
import { apps, teams } from '../schema';
import { nanoid } from 'nanoid';

export async function generateSlug({
  text,
  table,
}: {
  text: string;
  table: typeof teams | typeof apps;
}) {
  let slug = '';
  let tries = 0;

  while (!slug && tries < 100) {
    const candidate = slugify(text) + (tries ? `-${tries}` : '');
    const [existing] = await db()
      .select({ count: sql<number>`count(*)::integer` })
      .from(table)
      .where(eq(table.slug, candidate))
      .limit(1);

    if (existing.count === 0) {
      slug = candidate;
      break;
    }

    tries++;
  }

  // just move on if we can't find a slug after 100 tries
  if (!slug) slug = nanoid(10);

  return slug;
}
