import type { NewUser, User } from './types';
import { users } from './schema';
import bcrypt from 'bcrypt';
import { db, id } from './db';
import { sql } from 'drizzle-orm';

export async function create(newUser: NewUser): Promise<User> {
  const hashedPassword = newUser.password
    ? await bcrypt.hash(newUser.password, 10)
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

export async function authenticate({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<User> {
  return null as any;
}
