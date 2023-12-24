import type { Meta, StoryObj } from '@storybook/react';

import { Chart } from '.';
import { defer, json } from '@remix-run/node';
import { requestsCountSeries, timeZone } from '~/storybook/stubs';
import { createRemixStub } from '~/storybook/mocks';

const meta = {
  title: 'Routes/:teamId ⁄ :projectId ⁄ overview/components/RequestsSection/components/Chart',
  component: Chart,
  parameters: {},
  decorators: [
    (Story) => {
      return (
        <div className="h-80">
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Chart>;

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
              requestsCountSeries,
              timeZone,
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
              requestsCountSeries: new Promise(() => {}),
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
              requestsCountSeries: Promise.reject(),
            }),
        },
      ]);

      return <RemixStub />;
    },
  ],
};
