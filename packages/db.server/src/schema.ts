/* eslint-disable @typescript-eslint/no-use-before-define */
import { relations } from 'drizzle-orm';
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
    .$type<{
      emails: string[];
      selectedEmail?: string | null;
      lastSelectedProjectSlug?: string | null;
      lastSelectedTeamSlug?: string | null;
    }>()
    .default({
      emails: [],
      selectedEmail: null,
      lastSelectedProjectSlug: null,
      lastSelectedTeamSlug: null,
    }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToTeams: many(usersToTeams),
}));

export const teams = pgTable('teams', {
  id: text('id').primaryKey(),
  slug: text('slug').unique(),
  name: text('name'),
  description: text('description'),
  createdBy: text('created_by').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  usersToTeams: many(usersToTeams),
  projects: many(projects),
}));

export const usersToTeams = pgTable('users_to_teams', {
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  teamId: text('team_id')
    .notNull()
    .references(() => teams.id),
});

export const usersToTeamsRelations = relations(usersToTeams, ({ one }) => ({
  team: one(teams, {
    fields: [usersToTeams.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [usersToTeams.userId],
    references: [users.id],
  }),
}));

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  slug: text('slug').unique(),
  shareSlug: text('share_slug').unique(),
  name: text('name'),
  apiKey: text('api_key'),
  url: text('url'),
  description: text('description'),
  teamId: text('team_id')
    .references(() => teams.id)
    .notNull(),
  createdBy: text('created_by'),
  visibility: text('visibility'),
  deleted: boolean('deleted'),
  clientVersion: text('client_version'),
  isNew: boolean('is_new'),
  salt: text('salt'),
  runtime: text('runtime'),
  previousSalt: text('previous_salt'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const projectsRelations = relations(projects, ({ one }) => ({
  team: one(teams, {
    fields: [projects.teamId],
    references: [teams.id],
  }),
}));
