import { env } from '@metronome/env.server';
import { globSync } from 'glob';
import { resolve } from 'path';

let observableRoutes: string[] = [];

export function getObservableRoutes() {
  if (observableRoutes.length === 0 || env.dev) {
    const routesPath = resolve(__dirname, '../app/routes');
    // prettier-ignore
    const routesWithEvents = globSync(`${routesPath}/**/*.{events.route.tsx, events.route.ts}`);

    // Strip the routesPath from the route and the extension
    observableRoutes = routesWithEvents.map((route) => {
      const routePath = route
        .replace(routesPath, '')
        .replace('.events.route.tsx', '')
        .replace('.events.route.ts', '')
        .split('/')
        .at(-1)!
        .replace(/\$/g, ':')
        .replace(/\./g, '/');

      return `/${routePath}`;
    });
  }

  return observableRoutes;
}
