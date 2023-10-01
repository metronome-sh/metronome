import { type FunctionComponent } from 'react';

import { Form } from '#app/components';

import { DeleteProject } from './components/DeleteProject';

export const DangerZoneForm: FunctionComponent = () => {
  return (
    <div className="pb-8">
      <Form.Section
        title="Danger Zone"
        description="These actions are not reversible."
      />
      <DeleteProject />
    </div>
  );
};
