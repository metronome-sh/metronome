import { Decorator } from '@storybook/react';

export { createRemixStub } from './createRemixStub';

import { createRemixStub } from './createRemixStub';

export function wait(
  minTime: number,
  maxTime: number,
  value: any,
): Promise<any> {
  const delay = Math.random() * (maxTime - minTime) + minTime;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, delay * 1000); // Convert delay to milliseconds
  });
}

export const remixRootDecorator: Decorator = (Story) => {
  const RemixStub = createRemixStub([
    {
      id: 'root',
      path: '/',
      Component: Story,
    },
  ]);

  return <RemixStub />;
};
