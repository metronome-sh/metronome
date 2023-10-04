import { type FunctionComponent } from 'react';

import { Section } from '../../../../components';
// import { Chart } from './components/Chart';
import { DataRequests } from './components/DataRequests';
import { DocumentRequests } from './components/DocumentRequests';
import { Duration } from './components/Duration';
import { Requests } from './components/Requests';

export const RequestsSection: FunctionComponent = () => {
  return (
    <Section>
      <Section.Title title="Requests" />
      <div className="px-2 md:px-6">
        <div className="relative w-full bg-background rounded-xl overflow-hidden">
          <div className="p-2 lg:p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Requests />
            <DocumentRequests />
            <DataRequests />
            <Duration />
          </div>
          <div className="h-40 lg:h-60">{/* <Chart /> */}</div>
        </div>
      </div>
    </Section>
  );
};
