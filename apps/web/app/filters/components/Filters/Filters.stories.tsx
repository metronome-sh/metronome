import type { Meta, StoryObj } from '@storybook/react';

import { Filters } from '.';
import { filters } from '#app/filters';
import { createRemixStub } from '#app/storybook/mocks';

const meta = {
  title: 'Basic/Filters',
  component: Filters,
  // parameters: {
  //   layout: 'centered',
  // },
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: '/',
          element: <Story />,
        },
      ]);

      return <RemixStub />;
    },
  ],
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    filters: [filters.dateRange(), filters.interval()],
  },
};
