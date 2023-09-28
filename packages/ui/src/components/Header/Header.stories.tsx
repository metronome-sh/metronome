import type { Meta, StoryObj } from '@storybook/react';

import { Header } from '.';
import React from 'react';
import { unstable_createRemixStub as createRemixStub } from '@remix-run/testing';

const meta = {
  title: 'Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: '/',
          Component: Story,
          // loader: () => json({ user, projects, project: projects[3] }),
        },
      ]);
      return <RemixStub />;
    },
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
