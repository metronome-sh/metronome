import { useLoaderData } from '@remix-run/react';
import { type FunctionComponent } from 'react';

import { Section } from '../../../../components';
import { Chart, Duration, Requests } from './components';
import { DataRequests } from './components/DataRequests';
import { DocumentRequests } from './components/DocumentRequests';

export const RequestsSection: FunctionComponent = () => {
  const { isUsingVite = false } = useLoaderData() as { isUsingVite?: boolean };

  if (isUsingVite) return null;

  return (
    <Section>
      <Section.Title title="Requests" />
      <div>
        <div className="relative w-full rounded-lg overflow-hidden border border-muted/50">
          <div className="p-2 lg:p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Requests />
            <DocumentRequests />
            <DataRequests />
            <Duration />
          </div>
          <div className="h-40 lg:h-60">
            <Chart />
          </div>
        </div>
      </div>
    </Section>
  );
};
