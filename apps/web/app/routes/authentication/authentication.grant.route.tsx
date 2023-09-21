import { Brand, Container } from '@metronome/ui';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Metronome' },
    { name: 'description', content: 'Remix Analytics' },
  ];
};

export default function Index() {
  return (
    <Container className="flex items-center justify-center">
      <Brand />
      <p className="text-lg text-white ml-2">Authentication</p>
    </Container>
  );
}
