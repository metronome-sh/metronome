const { routeExtensions } = require('remix-custom-routes');
const path = require('path');

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/*.*'],
  serverModuleFormat: 'cjs',
  tailwind: true,
  watchPaths: ['../../packages/**/dist/**/*.{js,jsx,ts}'],
  routes: async () => {
    const appDirectory = path.resolve(__dirname, 'app');
    const routes = routeExtensions(appDirectory);
    return routes;
  },
  appDirectory: 'app',
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
