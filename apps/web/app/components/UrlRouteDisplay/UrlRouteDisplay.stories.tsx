import type { Meta, StoryObj } from '@storybook/react';
import { UrlRouteDisplay } from '.';

const meta = {
  title: 'Basic/UrlRouteDisplay',
  component: UrlRouteDisplay,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof UrlRouteDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: '/reports/134556/detail',
    route: '/reports/:reportId/detail',
  },
};

export const WithSplat: Story = {
  args: {
    url: '/docs/getting-started/express-adapter',
    route: '/docs/*',
  },
};
