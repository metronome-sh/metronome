import { Temporal } from '@js-temporal/polyfill';
import { z } from 'zod';

import { projects, teams, usages, users, usersToTeams } from './schema';
import {
  ActionEventSchema,
  EventSchema,
  EventsSchema,
  IdentifierSchema,
  LoaderEventSchema,
  NavigateAwayEventSchema,
  PageviewEventSchema,
  RequestEventSchema,
  WebVitalEventSchema,
} from './schemaValidation';

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

export type UpdateProjectAttributes = Partial<
  Pick<Project, 'name' | 'url' | 'description' | 'isPublic' | 'isNew'>
>;

export type Usage = typeof usages.$inferInsert;

export type NewUsage = Omit<typeof usages.$inferInsert, 'timestamp'>;

export type PageviewEvent = z.infer<typeof PageviewEventSchema>;

export type NavigateAwayEvent = z.infer<typeof NavigateAwayEventSchema>;

export type RequestEvent = z.infer<typeof RequestEventSchema>;

export type ActionEvent = z.infer<typeof ActionEventSchema>;

export type LoaderEvent = z.infer<typeof LoaderEventSchema>;

export type WebVitalEvent = z.infer<typeof WebVitalEventSchema>;

export type Identifier = z.infer<typeof IdentifierSchema>;

export type Event = z.infer<typeof EventSchema>;

export type Events = z.infer<typeof EventsSchema>;

export type Interval = 'hour' | 'day' | 'week' | 'month';

export type Range = {
  from: Temporal.ZonedDateTime;
  to: Temporal.ZonedDateTime;
};
