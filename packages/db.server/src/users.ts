import { compare, hash } from 'bcryptjs';
import { eq, sql } from 'drizzle-orm';

import { db, id } from './db';
import { users, usersToTeams } from './schema';
import { type NewUser, type User } from './types';

export async function create(newUser: NewUser): Promise<User> {
  const hashedPassword = newUser.password
    ? await hash(newUser.password, 10)
    : null;

  const [createdUser] = await db({ writable: true })
    .insert(users)
    .values({ ...newUser, password: hashedPassword, id: id('user') })
    .returning();

  return { ...createdUser, usersToTeams: [] };
}

export async function atLeastOneExists(): Promise<boolean> {
  const [result] = await db()
    .select({
      count: sql<number>`count(*)::integer`,
    })
    .from(users);

  return result.count > 0;
}

export async function authenticate(credentials: {
  email: string;
  password: string;
}): Promise<User | null> {
  const userWithPassword = await db().query.users.findFirst({
    where: (users, { eq }) => eq(users.email, credentials.email),
    with: { usersToTeams: { with: { team: true } } },
  });

  if (!userWithPassword) {
    return null;
  }

  const { password, ...user } = userWithPassword;

  const isPasswordValid = await compare(credentials.password, password || '');

  if (!isPasswordValid) return null;

  return user;
}

// eslint-disable-next-line @typescript-eslint/no-shadow
export async function findFirst({ id }: { id: string }): Promise<User | null> {
  const user = await db().query.users.findFirst({
    columns: { password: false },
    where: (users, { eq }) => eq(users.id, id),
    with: { usersToTeams: { with: { team: true } } },
  });

  return user ?? null;
}

export async function upsert({
  getter,
  create,
  update,
}: {
  getter: { strategyUserId: string; strategy: string };
  create: NewUser;
  update: Partial<NewUser>;
}): Promise<User> {
  const user = await db().query.users.findFirst({
    columns: { password: false },
    where: (users, { and, eq }) =>
      and(
        eq(users.strategyUserId, getter.strategyUserId),
        eq(users.strategy, getter.strategy),
      ),
    with: { usersToTeams: { with: { team: true } } },
  });

  if (user) {
    await db().update(users).set(update).where(eq(users.id, user.id));
    return { ...user, ...update };
  }

  const [createdUser] = await db({ writable: true })
    .insert(users)
    .values({ ...create, id: id('user') })
    .returning();

  return { ...createdUser, usersToTeams: [] };
}

export async function addToTeam({
  userId,
  teamId,
}: {
  userId: string;
  teamId: string;
}) {
  await db({ writable: true }).insert(usersToTeams).values({
    userId,
    teamId,
  });
}

export async function lastSelectedProjectSlug({
  userId,
  projectSlug,
}: {
  userId: string;
  projectSlug: string;
}) {
  await db({ writable: true })
    .update(users)
    .set({
      settings: sql`jsonb_set(settings, array['lastSelectedProjectSlug'], to_jsonb(${projectSlug}::text))`,
    })
    .where(eq(users.id, userId));
}
