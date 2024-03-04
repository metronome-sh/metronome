import { cache } from '@metronome/cache';
import { projects, spans, teams } from '@metronome/db';
import { queues } from '@metronome/queues';
import { invariant } from 'ts-invariant';

export async function otelSpans(job: typeof queues.otelSpans.$inferJob) {
  const {
    data: { apiKey, spans: data },
  } = job;

  if (!spans.valid(data)) {
    return `Invalid spans data: ${JSON.stringify(data)}`;
  }

  const project = await cache.remember(
    [apiKey, 'project'],
    async () => projects.findByApiKey({ apiKey }),
    60,
  );

  if (!project) {
    return `No project found for key ${apiKey}`;
  }

  const team = await cache.remember(
    [apiKey, 'team'],
    async () => teams.findFirst({ id: project.teamId }),
    60,
  );

  invariant(team, `Team ${project.teamId} not found`);

  if (project.isNew) {
    await cache.forget(apiKey);

    const updatedProject = await projects.update({
      id: project.id,
      attributes: { isNew: false },
    });

    await cache.set([apiKey, 'project'], updatedProject, 60);

    await queues.events.add({
      projectId: project.id,
      eventsNames: ['first-event'],
      ts: Date.now(),
    });
  }

  await spans.create({ spanOrSpans: data, project });

  return `processed spans for project ${project.id}`;
}
