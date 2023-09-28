import { Outlet } from '@remix-run/react';

import { Container, Header } from '#app/components';

export default function Component() {
  return (
    <Container>
      <Header />
      {/* <h1 className="text-foreground">route</h1> */}
      <Outlet />
    </Container>
  );
}
