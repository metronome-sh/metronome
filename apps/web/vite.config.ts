import { unstable_vitePlugin as remixPlugin } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { routeExtensions } from 'remix-custom-routes';
import path from 'path';
import envOnly from 'vite-env-only';
import { removeNonDefaultExportsFromRoutes } from './.storybook/remove-non-default-exports';

installGlobals();

const isStorybook = process.argv[1]?.includes('storybook');

const remix = remixPlugin({
  ignoredRouteFiles: ['**/.*'],
  routes: async () => routeExtensions(path.resolve(__dirname, 'app')),
  serverModuleFormat: 'esm',
});

export default defineConfig({
  logLevel: 'info',
  define: {
    'process.env.NODE_DEBUG': JSON.stringify(false),
  },
  plugins: [envOnly(), !isStorybook ? remix : removeNonDefaultExportsFromRoutes(), tsconfigPaths()],
});
