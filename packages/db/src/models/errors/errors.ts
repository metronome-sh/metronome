import { Project } from '../../types';
import { clickhouse } from '../../modules/clickhouse';
import { camelCase } from 'lodash-es';
import { CamelCasedProperties } from 'type-fest';

export async function all({ project }: { project: Project }) {
  const result = await clickhouse.query({
    query: `
      select
        sum(occurrences) as occurrences,
        any(hash) as hash,
        any(kind) as kind,
        any(name) as name,
        any(message) as message,
        minMerge(first_seen) as firstSeen,
        maxMerge(last_seen) as lastSeen,
        groupUniqArrayMerge(versions) as versions,
        groupUniqArrayMerge(event_ids) as eventIds,
        groupUniqArrayMerge(route_ids) as routeIds
      from
        errors
      where
        project_id = {projectId: String}
      having
        occurrences > 0
    `,
    format: 'JSONEachRow',
    query_params: {
      projectId: project.id,
    },
  });

  type ProjectErrors = {
    occurrences: number;
    hash: string;
    kind: string;
    name: string;
    message: string;
    versions: string[];
    firstSeen: string;
    lastSeen: string;
    eventIds: string[];
    routeIds: string[];
  };

  const errors = (await result.json<ProjectErrors[]>()).map((error) => ({
    ...error,
    lastSeen: Number(error.lastSeen),
    firstSeen: Number(error.firstSeen),
  }));

  return errors;
}
