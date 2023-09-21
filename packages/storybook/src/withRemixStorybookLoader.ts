import { type Configuration } from 'webpack';
import { type StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

export function withRemix(config: StorybookConfig): StorybookConfig {
  return { ...config, webpackFinal: withRemixStorybookLoader };
}

export function withRemixStorybookLoader(config: Configuration): Configuration {
  let tsxLoader = config.module?.rules?.find((rule) => {
    return `${(rule as any)?.test}` === `${/\.(mjs|tsx?|jsx?)$/}`;
  });
  tsxLoader = {
    ...(tsxLoader as any),
    use: [
      ...((tsxLoader as any)?.use ?? []),
      {
        loader: path.resolve(
          __dirname,
          '../loader/remove-remix-functions-loader.js',
        ),
      },
    ],
  };

  const loadersWithoutTsxLoader = config.module?.rules?.filter((rule) => {
    return `${(rule as any)?.test}` !== `${/\.(mjs|tsx?|jsx?)$/}`;
  });
  const finalConfig: typeof config = {
    ...config,
    externals: {
      ...(config.externals as any),
      'node:events': 'events',
      'node:stream': 'stream',
      'node:string_decoder': 'string_decoder',
      'node:crypto': 'crypto',
      'node:fs/promises': 'fs/promises',
      'node:fs': 'fs',
      'node:os': 'os',
      'node:path': 'path',
      'node:util': 'util',
    },
    module: {
      rules: [...(loadersWithoutTsxLoader ?? []), tsxLoader, {}],
    },
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        // '@remix-run/react': path.resolve(
        //   __dirname,
        //   '../mocks/modules/@remix-run/react/index.js',
        // ),
      },
      plugins: [...(config.resolve?.plugins ?? [])],
      fallback: {
        ...(config.resolve?.fallback ?? {}),
        os: false,
        url: false,
        http: false,
        fs: false,
      },
    },
  };
  return finalConfig;
}
