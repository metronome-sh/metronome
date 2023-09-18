import { Brand } from '@metronome/ui';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Metronome' },
    { name: 'description', content: 'Remix Analytics' },
  ];
};

export default function Index() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
      <Brand />
      <p className="text-lg text-white ml-2">Authentication</p>
    </div>
  );
}
