import type { Preview } from '@storybook/react';
import '../app/tailwind.css';

const preview: Preview = {
  globalTypes: {
    darkMode: {
      defaultValue: 'dark',
    },
    className: {
      defaultValue: 'dark',
    },
  },
  parameters: {
    backgrounds: { disable: true },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
