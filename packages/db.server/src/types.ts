import { projects, teams, users, usersToTeams } from './schema';

export type User = Omit<typeof users.$inferSelect, 'password'> & {
  usersToTeams: (UsersToTeams & { team: Team })[];
};

export type NewUser = Omit<typeof users.$inferInsert, 'id'>;

export type Team = typeof teams.$inferSelect;

export type NewTeam = Omit<typeof teams.$inferInsert, 'id' | 'slug'>;

export type UsersToTeams = typeof usersToTeams.$inferSelect;

export type Project = typeof projects.$inferSelect;

export type NewProject = Pick<
  typeof projects.$inferInsert,
  'name' | 'url' | 'teamId'
>;
