import { type FunctionComponent } from 'react';

import { Section } from '#app/routes/teams/routes/projects/components';

import { Chart } from './components/Chart';
import { Duration } from './components/Duration';
import { Errors } from './components/Errors';
import { Invocations } from './components/Invocations';

export const LoadersSection: FunctionComponent = () => {
  return (
    <Section>
      <Section.Title title="Loaders" />
      <div>
        <div className="relative w-full rounded-lg overflow-hidden border border-muted/50">
          <div className="p-2 lg:p-4 flex justify-between gap-4 flex-wrap md:flex-nowrap">
            <div className="flex-grow md:w-1/3">
              <Invocations />
            </div>
            <div className="flex-grow md:w-1/3">
              <Errors />
            </div>
            <div className="flex-grow md:w-1/3">
              <Duration />
            </div>
          </div>
          <div className="h-40 lg:h-60">
            <Chart />
          </div>
        </div>
      </div>
    </Section>
  );
};
