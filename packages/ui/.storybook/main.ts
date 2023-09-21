import type { StorybookConfig } from '@storybook/react-webpack5';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { withRemixStorybookLoader } from '@metronome/storybook';

const config: StorybookConfig = {
  typescript: { reactDocgen: 'react-docgen' },
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@gfpacheco/storybook-tailwind-dark-mode',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: {
          implementation: require.resolve('postcss'),
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal(config) {
    const finalConfig: typeof config = withRemixStorybookLoader({
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [
          ...(config.resolve?.plugins ?? []),
          new TsconfigPathsPlugin(),
        ],
      },
    });

    return finalConfig;
  },
};

export default config;
