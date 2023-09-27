import { Container } from '@metronome/ui';
import { Outlet } from '@remix-run/react';

export default function Component() {
  return (
    <Container>
      <h1>route</h1>
      <Outlet />
    </Container>
  );
}
