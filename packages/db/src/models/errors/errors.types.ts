import { SetFieldType } from 'type-fest';
import { errorsHousekeeping } from '../../schema';

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

export type ClickHouseProjectError = SetFieldType<ProjectError, 'firstSeen' | 'lastSeen', string>;

export type ErrorHousekeeping = typeof errorsHousekeeping.$inferSelect;

export type ErrorHousekeepingStatus = NonNullable<ErrorHousekeeping['status']>;
