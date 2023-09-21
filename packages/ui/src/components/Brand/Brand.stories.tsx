import type { Meta, StoryObj } from '@storybook/react';
import { Brand } from '.';
import { remixRootDecorator, mockUseFetcher } from '@metronome/storybook';

const meta: Meta<typeof Brand> = {
  title: 'Brand',
  component: Brand,
  parameters: {
    layout: 'centered',
  },
  args: {},
  decorators: [
    mockUseFetcher({
      state: 'loading',
    }),
    remixRootDecorator,
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Logo: Story = {
  args: {},
  render: (args) => <Brand.Logo {...args} />,
};
