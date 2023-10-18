import { type FunctionComponent } from 'react';

import { Section } from '../../../../components';
import { ReferrersTable } from './ReferrersTable';

export const ReferrersSection: FunctionComponent = () => {
  return (
    <Section className="flex flex-col">
      <Section.Title title="Sources" />
      <div>
        <ReferrersTable />
      </div>
    </Section>
  );
};
