import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {},
  // decorators: [remixRootDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'].map(
        (variant) => (
          <div key={variant} className="grid grid-cols-4 gap-2">
            {['sm', 'default', 'lg', 'icon'].map((size) => (
              <div className="flex flex-col justify-center items-center">
                <Button
                  {...args}
                  key={`${size}`}
                  size={size as any}
                  variant={variant as any}
                >
                  {size !== 'icon' ? 'button' : '🚀'}
                </Button>
                <span className="text-xs flex justify-center text-zinc-500 pt-1 ">
                  {variant} {size}
                </span>
              </div>
            ))}
          </div>
        ),
      )}
    </div>
  ),
};
