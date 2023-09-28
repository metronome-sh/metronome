import type { Meta, StoryObj } from '@storybook/react';
import TeamSlugCreateComponent from './$teamSlug.create.route';
import { json } from '@remix-run/node';
// import { project, projects, user } from '#/storybook/stubs';
import { createRemixStub } from '#/storybook/mocks/createRemixStub.tsx';

const meta = {
  title: 'Routes/:teamSlug ⁄ create/route',
  component: TeamSlugCreateComponent,
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof TeamSlugCreateComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: '/teamSlug/projectSlug/overview',
          Component: Story,
        },
      ]);

      return <RemixStub initialEntries={['/teamSlug/projectSlug/overview']} />;
    },
  ],
};
