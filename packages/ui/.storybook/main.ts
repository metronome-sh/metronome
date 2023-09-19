import type { StorybookConfig } from '@storybook/react-webpack5';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { join, dirname, resolve } from 'path';

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
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
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
  webpackFinal(config, options) {
    let tsxLoader = config.module?.rules?.find((rule) => {
      return `${(rule as any)?.test}` === `${/\.(mjs|tsx?|jsx?)$/}`;
    });

    tsxLoader = {
      ...(tsxLoader as any),
      use: [
        ...((tsxLoader as any)?.use ?? []),
        { loader: resolve(__dirname, './remove-remix-functions-loader.ts') },
      ],
    };

    const loadersWithoutTsxLoader = config.module?.rules?.filter((rule) => {
      return `${(rule as any)?.test}` !== `${/\.(mjs|tsx?|jsx?)$/}`;
    });

    const finalConfig: typeof config = {
      ...config,
      externals: {
        ...(config.externals as any),
        'node:events': 'node:events',
        'node:stream': 'node:stream',
        'node:string_decoder': 'node:string_decoder',
      },
      module: {
        rules: [...(loadersWithoutTsxLoader ?? []), tsxLoader],
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@remix-run/react': resolve(
            __dirname,
            './mocks/modules/@remix-run/react/index.ts',
          ),
        },
        plugins: [
          new TsconfigPathsPlugin(),
          ...(config.resolve?.plugins ?? []),
        ],
        fallback: {
          ...(config.resolve?.fallback ?? {}),
          os: false,
          url: false,
        },
      },
    };

    return finalConfig;
  },
};
export default config;
