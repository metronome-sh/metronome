import { zodResolver } from '@hookform/resolvers/zod';
import { users } from '@metronome/db.server';
import { Brand, Button, Card, Container, Form, Input } from '@metronome/ui';
import { handle } from '@metronome/utils.server';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { useSubmit } from '@remix-run/react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export async function action({ request }: ActionFunctionArgs) {
  if (await users.atLeastOneExists()) {
    throw redirect('/authentication/grant');
  }

  const { form } = await handle(request);

  const { email, password } = form.validate(CreateUserSchema);

  const user = await users.create({
    name: '',
    email,
    password,
    strategy: 'form',
  });

  console.log({ user });

  return null;
}

export async function loader() {
  if (await users.atLeastOneExists()) {
    throw redirect('/authentication/grant');
  }

  return null;
}

export default function Component() {
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
  });

  const submit = useSubmit();

  const handleSubmit = useCallback(
    (data: z.infer<typeof CreateUserSchema>) => {
      submit(data, { method: 'post', action: '/authentication/create' });
    },
    [submit],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Container className="flex flex-col items-center justify-center gap-8">
          <Brand className="h-9" />
          <Card className="w-full max-w-90">
            <Card.Header className="space-y-1">
              <Card.Title className="text-lg">Welcome to Metronome</Card.Title>
              <Card.Description>
                Create your instance user to get started.
              </Card.Description>
            </Card.Header>
            <Card.Content className="grid gap-4">
              <Form.Field
                name="email"
                render={({ field }) => (
                  <Form.Item className="grid gap-1">
                    <Form.Label>Email</Form.Label>
                    <Input {...field} />
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Field
                name="password"
                render={({ field }) => (
                  <Form.Item className="grid gap-1">
                    <Form.Label>Password</Form.Label>
                    <Input type="password" {...field} />
                    <Form.Message />
                  </Form.Item>
                )}
              />
              <Form.Field
                name="confirmPassword"
                render={({ field }) => (
                  <Form.Item className="grid gap-1">
                    <Form.Label>Password</Form.Label>
                    <Input type="password" {...field} />
                    <Form.Message />
                  </Form.Item>
                )}
              />
            </Card.Content>
            <Card.Footer>
              <Button className="w-full" type="submit">
                Create User
              </Button>
            </Card.Footer>
          </Card>
        </Container>
      </form>
    </Form>
  );
}
