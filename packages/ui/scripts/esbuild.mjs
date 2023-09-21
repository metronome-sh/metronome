import { build } from 'esbuild';
import { replace } from 'esbuild-plugin-replace';

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
  plugins: [
    replace({
      'process.env.METRONOME_DIFF': () => {
        return JSON.stringify(Math.random().toString(36).substring(2, 10));
      },
    }),
  ],
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
