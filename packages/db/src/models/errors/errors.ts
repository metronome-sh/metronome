import { queues } from '@metronome/queues';
import crypto from 'crypto';
import { and, eq, inArray } from 'drizzle-orm';
import { db } from '../../db';
import { Project, Range } from '../../types';
import { errorsHousekeeping } from '../../schema';
import { clickhouse } from '../../modules/clickhouse';
import { ClickHouseEvent } from '../events/events.types';
import { observable, operators, throttleTime } from '../../utils/events';
import { ClickHouseProjectError, ErrorHousekeepingStatus, ProjectError } from './errors.types';

export async function createErrorHouseKeepingFromEvents({
  events,
  project,
}: {
  events: ClickHouseEvent[];
  project: Project;
}) {
  const exceptions = events.filter((event) => event.name === 'exception');

  const keys = ['exception.type', 'exception.message', 'exception.stacktrace'];

  const hashes = exceptions.map((exception) => {
    const getValue = (key: string) => {
      return exception['event_attributes.value'][exception['event_attributes.key'].indexOf(key)];
    };
    return crypto.createHash('md5').update(keys.map(getValue).join('')).digest('hex');
  });

  const values = hashes.map((hash) => ({
    projectId: project.id,
    hash,
    status: 'unresolved' as const,
  }));

  if (values.length === 0) return;

  await db({ write: true })
    .insert(errorsHousekeeping)
    .values(values)
    .onConflictDoUpdate({
      target: [errorsHousekeeping.projectId, errorsHousekeeping.hash],
      set: { status: 'unresolved', updatedAt: new Date() },
    });

  await queues.events.add({
    eventsNames: ['errors-changed'],
    projectId: project.id,
    ts: Date.now(),
  });
}

export async function all({
  project,
  range,
  status,
}: {
  project: Project;
  status: ErrorHousekeepingStatus;
  range: Range;
}): Promise<ProjectError[]> {
  const result = await clickhouse.query({
    query: `
      select
        sum(occurrences) as occurrences,
        any(hash) as hash,
        any(kind) as kind,
        any(name) as name,
        any(message) as message,
        any(status) as status,
        minMerge(first_seen) as firstSeen,
        maxMerge(last_seen) as lastSeen,
        groupUniqArrayMerge(versions) as versions,
        groupUniqArrayMerge(event_ids) as eventIds,
        groupUniqArrayMerge(route_ids) as routeIds
      from
        errors
      inner join errors_housekeeping
        on errors.hash = errors_housekeeping.hash
        and errors.project_id = errors_housekeeping.project_id
        and errors_housekeeping.status = {status: String}
      where
        project_id = {projectId: String}
      having
        occurrences > 0
        and lastSeen >= {from: UInt64}
        and lastSeen <= {to: UInt64}
    `,
    format: 'JSONEachRow',
    query_params: {
      projectId: project.id,
      from: range.from.toInstant().epochMilliseconds,
      to: range.to.toInstant().epochMilliseconds,
      status,
    },
  });

  const errors = (await result.json<ClickHouseProjectError[]>()).map((error) => ({
    ...error,
    occurrences: Number(error.occurrences),
    lastSeen: Number(error.lastSeen),
    firstSeen: Number(error.firstSeen),
  }));

  return errors;
}

async function updateStatus({
  project,
  hashes,
  status,
}: {
  project: Project;
  hashes: string[];
  status: ErrorHousekeepingStatus;
}) {
  await db({ write: true })
    .update(errorsHousekeeping)
    .set({ status })
    .where(
      and(eq(errorsHousekeeping.projectId, project.id), inArray(errorsHousekeeping.hash, hashes)),
    );

  await queues.events.add({
    eventsNames: ['errors-changed'],
    projectId: project.id,
    ts: Date.now(),
  });
}

export function archive({ project, hashes }: { project: Project; hashes: string[] }) {
  return updateStatus({ project, hashes, status: 'archived' });
}

export function resolve({ project, hashes }: { project: Project; hashes: string[] }) {
  return updateStatus({ project, hashes, status: 'resolved' });
}

export function unresolve({ project, hashes }: { project: Project; hashes: string[] }) {
  return updateStatus({ project, hashes, status: 'unresolved' });
}

export async function watch(
  project: Project,
  callback: (event: { ts: number }) => Promise<void>,
): Promise<() => void> {
  await callback({ ts: Date.now() });

  const subscription = observable
    .pipe(
      operators.project(project),
      operators.events(['errors-changed']),
      throttleTime(1000, undefined, { leading: true, trailing: true }),
    )
    .subscribe(async ([e]) => {
      await callback({ ts: e.returnvalue.ts });
    });

  return () => subscription.unsubscribe();
}
