import { users } from '@metronome/db.server';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Brand,
  Button,
  Card,
  Container,
  Form,
  Input,
  Label,
  Icon,
} from '@metronome/ui';
import { handle } from '@metronome/utils.server';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const AuthenticationSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

export async function action({ request }: ActionFunctionArgs) {
  const { form, auth } = await handle(request);

  const { email, password } = form.validate(AuthenticationSchema);

  const session = await auth.attempt({ email, password });

  console.log({ session });

  // return response.redirect('/', { headers: { 'Set-Cookie': session.cookie } } });

  return { error: true };
}

export async function loader() {
  if (!(await users.atLeastOneExists())) {
    throw redirect('/authentication/create');
  }

  return null;
}

export default function Component() {
  const form = useForm<z.infer<typeof AuthenticationSchema>>({
    resolver: zodResolver(AuthenticationSchema),
    defaultValues: {
      email: 'erick@metronome.sh',
      password: '12345678',
    },
  });

  const fetcher = useFetcher<{ error: boolean }>();

  const handleSubmit = useCallback(
    (data: z.infer<typeof AuthenticationSchema>) => {
      fetcher.submit(data, { method: 'post', action: '/authentication/grant' });
    },
    [fetcher],
  );

  console.log({ test: fetcher.data?.error });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Container className="flex flex-col items-center justify-center gap-8">
          <Brand className="h-9" />
          <Card className="w-full max-w-90">
            <Card.Header className="space-y-1">
              <Card.Title className="text-lg">Authenticate</Card.Title>
              <Card.Description>Log in to your instance.</Card.Description>
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
            </Card.Content>
            <Card.Footer>
              <Button className="w-full" type="submit">
                Log in
              </Button>
            </Card.Footer>
          </Card>
          {fetcher.data?.error ? (
            <Alert className="max-w-90 text-red-500">
              <Icon.AlertSquareRoundedOutline className="stroke-red-500" />
              <Alert.Title>Invalid email or password</Alert.Title>
              <Alert.Description>Please try again.</Alert.Description>
            </Alert>
          ) : null}
        </Container>
      </form>
    </Form>
  );
}
