import { SetFieldType } from 'type-fest';
import { errorsHousekeeping } from '../../schema';
import { StackTraceSource } from '../sourcemaps/sourcemaps.types';

export type ProjectError = {
  occurrences: number;
  hash: string;
  kind: number;
  name: string;
  message: string;
  versions: string[];
  firstSeen: number;
  lastSeen: number;
  eventIds: string[];
  routeIds: string[];
  status: ErrorHousekeepingStatus;
};

export type ClickHouseProjectErrorListItem = SetFieldType<
  ProjectError,
  'firstSeen' | 'lastSeen',
  string
>;

export type ClickHouseProjectError = ClickHouseProjectErrorListItem & {
  stacktrace: string;
};

export type ProjectErrorWithSources = ProjectError & {
  sources: StackTraceSource[];
};

export type ErrorHousekeeping = typeof errorsHousekeeping.$inferSelect;

export type ErrorHousekeepingStatus = NonNullable<ErrorHousekeeping['status']>;
