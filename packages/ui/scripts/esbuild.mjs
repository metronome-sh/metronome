import { build } from 'esbuild';

/**
 * @type {import('esbuild').BuildOptions}
 */
const esbuildConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  treeShaking: true,
  platform: 'node',
  sourcemap: true,
  packages: 'external',
  target: 'node14',
  logLevel: 'info',
  loader: {
    '.svg': 'dataurl',
  },
};

export const esbuildConfigEsm = {
  ...esbuildConfig,
  format: 'esm',
  outdir: 'dist/esm',
};

export const esbuildConfigCjs = {
  ...esbuildConfig,
  format: 'cjs',
  outdir: 'dist/cjs',
};

(async () =>
  await Promise.all([build(esbuildConfigEsm), build(esbuildConfigCjs)]))();
