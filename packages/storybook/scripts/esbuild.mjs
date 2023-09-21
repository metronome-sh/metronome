import { build } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';

/**
 * @type {import('esbuild').BuildOptions}
 */
export const esbuildConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: true,
  packages: 'external',
  plugins: [
    copy({
      resolveFrom: 'cwd',
      assets: [
        {
          from: ['./src/mocks/**/*'],
          to: ['./dist/mocks'],
        },
        {
          from: ['./src/loader/**/*'],
          to: ['./dist/loader'],
        },
      ],
      watch: true,
    }),
  ],
  resolveExtensions: ['.ts', '.tsx', '.js', '.jsx'],
  platform: 'node',
  format: 'cjs',
  outdir: 'dist/cjs',
  logLevel: 'info',
};

await build(esbuildConfig);
