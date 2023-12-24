import type { Meta, StoryObj } from '@storybook/react';

import { WebVitalsCard } from '.';

const meta = {
  title:
    'Routes/:teamId ⁄ :projectId ⁄ overview/components/WebVitalsSection/components/WebVitalsCard',
  component: WebVitalsCard,
  parameters: {},
} satisfies Meta<typeof WebVitalsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'LCP',
    value: '200ms',
    median: '2.5 s',
    p10: '4.0 s',
    score: 88,
  },
};

export const NoData: Story = {
  args: {
    name: 'LCP',
    median: '2.5 s',
    p10: '4.0 s',
  },
};

export const Skeleton: Story = {
  args: {
    name: 'LCP',
    median: '2.5 s',
    p10: '4.0 s',
  },
  render: (args) => <WebVitalsCard.Skeleton {...args} />,
};

export const Error: Story = {
  args: {
    name: 'LCP',
  },
  render: (args) => <WebVitalsCard.Error />,
};
