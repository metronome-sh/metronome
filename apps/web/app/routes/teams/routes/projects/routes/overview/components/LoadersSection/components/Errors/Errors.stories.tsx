import type { Meta, StoryObj } from '@storybook/react';

import { Errors } from '.';
import { defer, json } from '@remix-run/node';
import { loadersOverview } from '#storybook/stubs';
import { createRemixStub } from '#storybook/mocks/createRemixStub';

const meta = {
  title: 'Routes/:teamId ⁄ :projectId ⁄ overview/components/LoadersSection/components/Errors',
  component: Errors,
  parameters: {},
} satisfies Meta<typeof Errors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: '/',
          Component: Story,
          loader: () =>
            json({
              loadersOverview,
            }),
        },
      ]);

      return <RemixStub />;
    },
  ],
};

export const Loading: Story = {
  args: {},
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: '/',
          Component: Story,
          loader: () =>
            defer({
              loadersOverview: new Promise(() => {}),
            }),
        },
      ]);

      return <RemixStub />;
    },
  ],
};

export const Error: Story = {
  args: {},
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: '/',
          Component: Story,
          loader: () =>
            defer({
              loadersOverview: Promise.reject(),
            }),
        },
      ]);

      return <RemixStub />;
    },
  ],
};
