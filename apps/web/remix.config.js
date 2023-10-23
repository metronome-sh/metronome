const { routeExtensions } = require('remix-custom-routes');
const path = require('path');
const { glob } = require('glob');

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/*.*'],
  serverModuleFormat: 'cjs',
  tailwind: true,
  watchPaths: async () => {
    async function findFiles(patterns) {
      try {
        const patternArr = Array.isArray(patterns) ? patterns : [patterns];
        const resolved = patternArr.map((ptr) => path.resolve(__dirname, ptr));

        const files = await glob(resolved, {
          cwd: __dirname,
          ignore: '/**/node_modules/**',
        });

        return files;
      } catch (err) {
        console.error('An error occurred:', err);
        return [];
      }
    }

    const files = await findFiles(['../../packages/**/dist/**/index.js']);

    return files
      .flat()
      .map((file) => `${path.dirname(path.resolve(__dirname, file))}/*`);
  },
  routes: async () => {
    const appDirectory = path.resolve(__dirname, 'app');

    // const sortRoutes = (routes) => {
    //   const sortedKeys = Object.keys(routes).sort((a, b) => {
    //     const isATeamSlug = a.startsWith('$');
    //     const isBTeamSlug = b.startsWith('$');

    //     if (isATeamSlug && !isBTeamSlug) return 1;
    //     if (!isATeamSlug && isBTeamSlug) return -1;
    //     return 0;
    //   });

    //   const sortedRoutes = {};

    //   for (const key of sortedKeys) {
    //     sortedRoutes[key] = routes[key];
    //   }

    //   return sortedRoutes;
    // };

    const routes = routeExtensions(appDirectory);

    return routes;
  },
  appDirectory: 'app',
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
