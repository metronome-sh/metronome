import { InferSelectModel } from 'drizzle-orm';

import { teams, users } from './schema';

export type User = InferSelectModel<typeof users>;

export type NewUser = Omit<typeof users.$inferInsert, 'id'>;

export type Teams = InferSelectModel<typeof teams>;
