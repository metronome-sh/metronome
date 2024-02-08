import { CamelCasedProperties } from 'type-fest';

export interface ClickHouseSourcemap {
  project_id: string;
  version: string;
  path: string;
  deleted: number;
  created_at: Date;
  updated_at: Date;
}

export type Sourcemap = CamelCasedProperties<ClickHouseSourcemap>;
