import { createRemixStub } from './createRemixStub';
import { Decorator } from '@storybook/react';

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
