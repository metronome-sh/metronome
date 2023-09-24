import { Brand, Button, Card, Container, Input, Label } from '@metronome/ui';
import { useState } from 'react';

export default function Component() {
  return (
    <Container className="flex flex-col items-center justify-center gap-8">
      <Brand className="h-9" />
      <Card className="w-full max-w-90">
        <Card.Header className="space-y-1">
          <Card.Title className="text-lg">Authenticate</Card.Title>
          <Card.Description>Log in to your instance.</Card.Description>
        </Card.Header>
        <Card.Content className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="user">Username</Label>
            <Input id="user" type="user" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </Card.Content>
        <Card.Footer>
          <Button className="w-full">Log in</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
