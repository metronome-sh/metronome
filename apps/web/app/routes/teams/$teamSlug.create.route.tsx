import { zodResolver } from '@hookform/resolvers/zod';
import { projects, teams } from '@metronome/db.server';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { useParams, useSubmit } from '@remix-run/react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Card, Form, Input } from '#app/components';
import { handle } from '#app/handlers';
import { notFound } from '#app/responses';

export type CreateProjectSchemaType = z.infer<typeof CreateProjectSchema>;

export const CreateProjectSchema = z.object({
  name: z
    .string()
    .min(3)
    .refine((value) => !value.includes('create'), {
      message: 'The string should not contain the word "create"',
    }),
  url: z.union([z.string().url(), z.literal('')]),
});

export async function action({ request, params }: ActionFunctionArgs) {
  const { auth, form } = await handle(request);

  const user = await auth.user();

  const { name, url } = form.validate(CreateProjectSchema);

  const { teamSlug = '' } = params;

  const team = await teams.findBySlug({ teamSlug, userId: user.id });

  if (!team) throw notFound();

  const project = await projects.insert({
    name,
    url: url || null,
    teamId: team.id,
  });

  return redirect(`/${team.slug}/${project.slug}`);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { auth } = await handle(request);

  await auth.user();

  return null;
}

export default function Component() {
  const { teamSlug } = useParams();

  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    defaultValues: { name: '', url: '' },
    resolver: zodResolver(CreateProjectSchema),
  });

  const submit = useSubmit();

  const handleSubmit = useCallback(
    (data: z.infer<typeof CreateProjectSchema>) => {
      submit(data, { method: 'post', action: `/${teamSlug}/create` });
    },
    [submit, teamSlug],
  );

  return (
    <div className="flex items-center flex-grow">
      <Card className="mx-auto max-w-lg w-full">
        <Form.Provider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Card.Header>
              <Card.Title>Create project</Card.Title>
              <Card.Description>
                Create a new project to start tracking your app&apos;s
                performance
              </Card.Description>
            </Card.Header>
            <Card.Content className="space-y-6">
              <Form.Field
                name="name"
                render={({ field }) => (
                  <Form.Item className="grid gap-1">
                    <Form.Label>Name</Form.Label>
                    <Input {...field} autoComplete="off" />
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Field
                name="url"
                render={({ field }) => (
                  <Form.Item className="grid gap-1">
                    <Form.Label>Url</Form.Label>
                    <Input {...field} autoComplete="off" />
                    <Form.Message />
                  </Form.Item>
                )}
              />
            </Card.Content>
            <Card.Footer className="flex justify-end gap-2">
              <Button>Create</Button>
            </Card.Footer>
          </form>
        </Form.Provider>
      </Card>
    </div>
  );
}
