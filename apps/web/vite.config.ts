import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { routeExtensions } from 'remix-custom-routes';
import path from 'path';
import envOnly from 'vite-env-only';

installGlobals();

export default defineConfig({
  plugins: [
    envOnly(),
    remix({
      ignoredRouteFiles: ['**/.*'],
      routes: async () => routeExtensions(path.resolve(__dirname, 'app')),
      serverModuleFormat: 'esm',
    }),
    tsconfigPaths(),
  ],
});
