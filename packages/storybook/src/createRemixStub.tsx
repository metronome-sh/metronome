import { unstable_createRemixStub as createRemixStubPrimitive } from '@remix-run/testing';

import { type MockContextValue, MockProvider } from './MockContext.js';

type Routes = Parameters<typeof createRemixStubPrimitive>[0];
type Context = Parameters<typeof createRemixStubPrimitive>[1];

export function createRemixStub(
  routes: Routes,
  context?: Context,
  mocks?: MockContextValue,
): ReturnType<typeof createRemixStubPrimitive> {
  // Inject the context in each route and children
  const injectRouteContext = (route: Routes[number]) => {
    const routeWithContext: Routes[number] = {
      ...route,
      // Component: () =>
      //   (
      //     <MockProvider mocks={mocks ?? {}}>
      //       {route.Component ? <route.Component /> : null}
      //     </MockProvider>
      //   ) as any,
    };

    if (routeWithContext.children) {
      routeWithContext.children = routeWithContext.children.map((child) => {
        return injectRouteContext(child);
      }) as Routes[number]['children'];
    }

    return routeWithContext;
  };

  const routesWithContext = routes.map((route) => {
    return injectRouteContext(route);
  });

  return createRemixStubPrimitive(routesWithContext, context);
}
