import type { NewUser, User } from './types';
import { users } from './schema';
import bcryptjs from 'bcryptjs';
import { db, id } from './db';
import { eq, sql } from 'drizzle-orm';

export async function create(newUser: NewUser): Promise<User> {
  const hashedPassword = newUser.password
    ? await bcryptjs.hash(newUser.password, 10)
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
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      password: users.password,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.email, credentials.email));

  if (!userWithPassword) {
    return null;
  }

  const { password, ...user } = userWithPassword;

  const isPasswordValid = await bcryptjs.compare(
    credentials.password,
    password || '',
  );

  if (!isPasswordValid) return null;

  return user;
}
