import type { Meta, StoryObj } from '@storybook/react';

import { WebVitalBar } from '.';

const meta = {
  title:
    'Routes/:teamId ⁄ :projectId ⁄ overview/components/WebVitalsSection/components/WebVitalsCard/components/WebVitalBar',
  component: WebVitalBar,
  parameters: {},
} satisfies Meta<typeof WebVitalBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    left: '2.5 s',
    right: '4.0 s',
    score: 25,
  },
};

export const Disabled: Story = {
  args: {
    left: '2.5 s',
    right: '4.0 s',
    isDisabled: true,
  },
};

export const Loading: Story = {
  args: {
    left: '2.5 s',
    right: '4.0 s',
    isLoading: true,
  },
};
