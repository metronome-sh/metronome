import type { Meta, StoryObj } from '@storybook/react';

import { BounceRate } from '.';
import { json } from '@remix-run/node';
import { project, bounceRate } from '~/storybook/stubs';
import { createRemixStub } from '~/storybook/mocks';

const meta = {
  title:
    'Routes/:teamId ⁄ :projectId ⁄ overview/components/WebAnalyticsSection/components/BounceRate',
  component: BounceRate,
  parameters: {},
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: '/',
          element: <Story />,
          loader: () => json({ project, bounceRate }),
        },
      ]);

      return <RemixStub />;
    },
  ],
} satisfies Meta<typeof BounceRate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'BounceRate',
    value: '200',
  },
};
