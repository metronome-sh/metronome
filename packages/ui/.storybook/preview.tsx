import type { Preview } from '@storybook/react';
import '../tailwind.css';
const preview: Preview = {
  globalTypes: {
    darkMode: {
      defaultValue: false,
    },
    className: {
      defaultValue: 'dark',
    },
  },
  parameters: {
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
