import { Decorator } from '@storybook/react';

import { createRemixStub } from './createRemixStub';

export const remixRootDecorator: Decorator = (Story) => {
  const RemixStub = createRemixStub([
    {
      id: 'root',
      path: '/',
      Component: Story,
    },
  ]);

  return (<RemixStub />) as any;
};
