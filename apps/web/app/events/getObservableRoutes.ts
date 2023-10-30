import { env } from '@metronome/env.server';
import { globSync } from 'glob';
import { resolve } from 'path';

let observableRoutes: string[] = [];

export function getObservableRoutes(
  paths: string[] = [resolve(__dirname, '../app/routes')],
) {
  if (observableRoutes.length === 0 || env.dev) {
    // prettier-ignore
    const routesWithEvents = globSync(paths.map((p) => `${p}/**/*.{events.route.tsx, events.route.ts}`));

    // Strip the routesPath from the route and the extension
    observableRoutes = routesWithEvents.map((route) => {
      const routePath = route
        .split('/')
        .at(-1)!
        .replace('.events.route.tsx', '')
        .replace('.events.route.ts', '')
        .replace(/\$/g, ':')
        .replace(/\./g, '/');

      return `/${routePath}`;
    });
  }

  return observableRoutes;
}
