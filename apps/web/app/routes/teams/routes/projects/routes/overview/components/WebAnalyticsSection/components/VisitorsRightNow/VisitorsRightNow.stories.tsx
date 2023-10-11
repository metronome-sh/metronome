import type { Meta, StoryObj } from '@storybook/react';

import { VisitorsRightNow } from '.';
import { defer, json } from '@remix-run/node';
import { project, visitorsRightNow } from '~/storybook/stubs';
import { createRemixStub } from '~/storybook/mocks';

const meta = {
  title:
    'Routes/:teamId ⁄ :projectId ⁄ overview/components/WebAnalyticsSection/components/VisitorsRightNow',
  component: VisitorsRightNow,
  parameters: {},
} satisfies Meta<typeof VisitorsRightNow>;

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
          loader: () => json({ project, visitorsRightNow }),
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
          loader: () => defer({ project, visitorsRightNow: new Promise(() => {}) }),
        },
      ]);

      return <RemixStub />;
    },
  ],
};
