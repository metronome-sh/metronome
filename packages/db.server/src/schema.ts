import { boolean, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password'),
  avatar: text('avatar'),
  strategy: text('strategy'),
  strategyUserId: text('strategy_user_id'),
  settings: jsonb('settings')
    .$type<{ emails: string[] }>()
    .default({ emails: [] }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const teams = pgTable('teams', {
  id: text('id').primaryKey(),
  name: text('name'),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const usersToTeams = pgTable('users_to_teams', {
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  teamId: text('team_id')
    .notNull()
    .references(() => teams.id),
});

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  name: text('name'),
  apiKey: text('api_key'),
  url: text('url'),
  description: text('description'),
  teamId: text('team_id').references(() => teams.id),
  createdBy: text('created_by'),
  visibility: text('visibility'),
  deleted: boolean('deleted'),
  clientVersion: text('client_version'),
  isNew: boolean('is_new'),
  salt: text('salt'),
  previousSalt: text('previous_salt'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
