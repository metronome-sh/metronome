import { Brand, Button, Card, Container, Input, Label } from '@metronome/ui';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { users } from '#app/server/db.server.ts';

export async function loader() {
  if (await users.atLeastOneExists()) {
    throw redirect('/authentication/grant');
  }

  return null;
}

export async function action({
  request,
  context: { form },
}: MetronomeActionFunctionArgs) {
  if (await users.atLeastOneExists()) {
    throw redirect('/authentication/grant');
  }

  // form.validate(schema);

  //

  // const user = await users.create({ email, password, name: 'Metronome' });

  return null;
}

export default function Component() {
  return (
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
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
        </Card.Content>
        <Card.Footer>
          <Button className="w-full">Create User</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
