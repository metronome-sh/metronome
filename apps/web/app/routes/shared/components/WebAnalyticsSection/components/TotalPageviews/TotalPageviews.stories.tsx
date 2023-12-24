import type { Meta, StoryObj } from '@storybook/react';

import { TotalPageviews } from '.';
import { json } from '@remix-run/node';
import { project, pageviewsCount } from '~/storybook/stubs';
import { createRemixStub } from '~/storybook/mocks';

const meta = {
  title:
    'Routes/:teamId ⁄ :projectId ⁄ overview/components/WebAnalyticsSection/components/TotalPageviews',
  component: TotalPageviews,
  parameters: {},
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: '/',
          element: <Story />,
          loader: () => json({ project, pageviewsCount }),
        },
      ]);

      return <RemixStub />;
    },
  ],
} satisfies Meta<typeof TotalPageviews>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'TotalPageviews',
    value: '200',
  },
};
