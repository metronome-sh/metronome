import type { Meta, StoryObj } from '@storybook/react';

import { Metric } from '.';

const meta = {
  title: 'Routes/:teamId ⁄ :projectId ⁄ overview/components/Metric',
  component: Metric,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Metric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Metric',
    value: '200',
  },
};

export const Skeleton: Story = {
  args: {
    title: 'Metric',
    value: '200',
  },
  render: (args) => <Metric.Skeleton {...args} />,
};

export const Error: Story = {
  args: {
    title: 'Metric',
    value: '200',
  },
  render: (args) => <Metric.Error {...args} />,
};

export const Compact: Story = {
  args: {
    title: 'Metric',
    value: '200',
    compact: true,
  },
};

export const CompactSkeleton: Story = {
  args: {
    title: 'Metric',
    value: '200',
    compact: true,
  },
  render: (args) => <Metric.Skeleton {...args} />,
};

export const CompactError: Story = {
  args: {
    title: 'Metric',
    value: '200',
    compact: true,
  },
  render: (args) => <Metric.Error {...args} />,
};
