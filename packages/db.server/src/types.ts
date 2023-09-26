import { InferSelectModel } from 'drizzle-orm';

import { teams, users } from './schema';

export type User = Omit<typeof users.$inferSelect, 'password'>;

export type NewUser = Omit<typeof users.$inferInsert, 'id'>;

export type Teams = typeof teams.$inferSelect;
