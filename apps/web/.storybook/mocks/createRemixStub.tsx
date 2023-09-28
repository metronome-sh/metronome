import { unstable_createRemixStub as createRemixStubPrimitive } from '../../node_modules/@remix-run/testing';
import { MockProvider, MockContextValue } from './MockContext';

type Routes = Parameters<typeof createRemixStubPrimitive>[0];
type Context = Parameters<typeof createRemixStubPrimitive>[1];

export function createRemixStub(
  routes: Routes,
  context?: Context,
  mocks?: MockContextValue,
) {
  // Inject the context in each route and children
  const injectRouteContext = (route: Routes[number]) => {
    const routeWithContext: Routes[number] = {
      ...route,
      Component: route.Component,
      // Component: <MockProvider mocks={mocks ?? {}}>{route.element}</MockProvider>,
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
