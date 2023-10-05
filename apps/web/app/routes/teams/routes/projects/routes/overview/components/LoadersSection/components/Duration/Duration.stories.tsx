import type { Meta, StoryObj } from '@storybook/react';

import { Duration } from '.';
import { defer, json } from '@remix-run/node';
import { loadersOverview } from '~/storybook/stubs';
import { createRemixStub } from '~/storybook/mocks';

const meta = {
  title: 'Routes/:teamId ⁄ :projectId ⁄ overview/components/LoadersSection/components/Duration',
  component: Duration,
  parameters: {},
} satisfies Meta<typeof Duration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: '/',
          element: <Story />,
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
          element: <Story />,
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
          element: <Story />,
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
