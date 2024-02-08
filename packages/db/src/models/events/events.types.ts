import { CamelCasedProperties, SetFieldType } from 'type-fest';
import { type EventSchema } from './events';
import { z } from 'zod';

export interface ClickHouseEvent {
  project_id: string;
  trace_id: string;
  span_id: string;
  timestamp: number;
  name: string;
  'event_attributes.key': string[];
  'event_attributes.value': string[];
}

export type Event = z.infer<typeof EventSchema>;
