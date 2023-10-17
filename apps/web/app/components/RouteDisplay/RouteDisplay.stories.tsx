import type { Meta, StoryObj } from '@storybook/react';
import { RouteDisplay } from '.';

const meta = {
  title: 'Basic/RouteDisplay',
  component: RouteDisplay,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof RouteDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    route: '/reports/:reportId/detail',
  },
};

export const WithSplat: Story = {
  args: {
    route: '/docs/*',
  },
};
