import { type LinksFunction, type LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from '@remix-run/react';
import isbot from 'isbot';
import { useEffect } from 'react';

import { EventProvider, getObservableRoutes } from '#app/events';
import { handle } from '#app/handlers';

import styles from './tailwind.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export async function loader({ request }: LoaderFunctionArgs) {
  const { auth } = await handle(request);

  const user = await auth.user({ required: false });

  const observableRoutes = getObservableRoutes();

  return { user, observableRoutes };
}

function App() {
  const location = useLocation();

  /**
   * Handling daylight savings or timezone changes
   */
  useEffect(() => {
    if (isbot(navigator.userAgent)) return;

    const regexp = new RegExp('(^| )tzOffset=([^;]+)');
    const cookieTzOffset = (document.cookie.match(regexp) || [])[2];
    const tzOffset = new Date().getTimezoneOffset();

    if (cookieTzOffset !== `${tzOffset}`) {
      document.cookie = `tzOffset=${tzOffset}; path=/; max-age=31536000`;
      window.location.reload();
    }
  }, [location.key]);

  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <Meta />
        <Links />
      </head>
      <body className="antialiased dark:bg-zinc-950">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  return (
    <EventProvider>
      <App />
    </EventProvider>
  );
}
