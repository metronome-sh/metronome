import { Container, Header } from '#app/components';

import { Heading, Navigation } from './components';

export default function Component() {
  return (
    <Container className="flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <Navigation />
        <div className="w-full flex-grow pl-4">
          <div className="w-full h-full bg-zinc-50 dark:bg-zinc-950 rounded-lg">
            <Heading
              title="Overview"
              description={`General summary of your app`}
            />
            <div className="space-y-4">
              <div className="w-full h-80 px-4">
                <div className="w-full h-full bg-muted/40 rounded-lg"></div>
              </div>
              <div className="w-full h-80 px-4">
                <div className="w-full h-full bg-muted/40 rounded-lg"></div>
              </div>
              <div className="w-full h-80 px-4">
                <div className="w-full h-full bg-muted/40 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
