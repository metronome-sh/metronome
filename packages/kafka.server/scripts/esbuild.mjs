import { build } from 'esbuild';

/**
 * @type {import('esbuild').BuildOptions}
 */
export const esbuildConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: true,
  packages: 'external',
  plugins: [],
  platform: 'node',
  format: 'cjs',
  outdir: 'dist/cjs',
  logLevel: 'info',
};

await build(esbuildConfig);
