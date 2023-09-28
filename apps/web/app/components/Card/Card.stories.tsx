import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '.';
import { Label } from '../Label';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
