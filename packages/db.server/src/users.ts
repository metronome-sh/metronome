import { compare, hash } from 'bcryptjs';
import { and, eq, sql } from 'drizzle-orm';

import { db, id } from './db';
import { users } from './schema';
import { type NewUser, type User } from './types';

export async function create(newUser: NewUser): Promise<User> {
  const hashedPassword = newUser.password
    ? await hash(newUser.password, 10)
    : null;

  const [user] = await db({ writable: true })
    .insert(users)
    .values({ ...newUser, id: id('user'), password: hashedPassword })
    .returning();

  return user;
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
  const [userWithPassword] = await db()
    .select()
    .from(users)
    .where(eq(users.email, credentials.email));

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
  const [user] = await db()
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      avatar: users.avatar,
      strategy: users.strategy,
      strategyUserId: users.strategyUserId,
      settings: users.settings,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.id, id));

  return user ?? null;
}

export async function upsert({
  getter,
  create,
  update,
}: {
  getter: { strategyUserId: string; strategy: string };
  create: any;
  update: Partial<NewUser>;
}): Promise<User> {
  const columns = {
    id: users.id,
    email: users.email,
    name: users.name,
    avatar: users.avatar,
    strategy: users.strategy,
    strategyUserId: users.strategyUserId,
    settings: users.settings,
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
  };

  let [user] = await db()
    .select(columns)
    .from(users)
    .where(
      and(
        eq(users.strategyUserId, getter.strategyUserId),
        eq(users.strategy, getter.strategy),
      ),
    )
    .limit(1);

  if (user) {
    [user] = await db()
      .update(users)
      .set(update)
      .where(eq(users.id, user.id))
      .returning(columns);

    return user;
  }

  [user] = await db({ writable: true })
    .insert(users)
    .values({ ...create, id: id('user') })
    .returning(columns);

  return user;
}
