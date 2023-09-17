import { InferSelectModel } from 'drizzle-orm';
import { users } from './users.schema';

export type User = InferSelectModel<typeof users>;
