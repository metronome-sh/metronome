import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { invariant } from 'ts-invariant';

import { EventProvider, getObservableRoutes } from '#app/events';
import { handle } from '#app/handlers';

import { useTimeZoneSync } from './hooks';
import styles from './tailwind.css';
import { getTimeZoneFromRequest } from './utils/timeZone';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export async function loader({ request }: LoaderFunctionArgs) {
  const { auth } = await handle(request);

  const user = await auth.user({ required: false });

  const observableRoutes = getObservableRoutes();

  const regexp = new RegExp('(^| )tzOffset=([^;]+)');
  const cookie = request.headers.get('cookie');

  invariant(cookie, 'cookie is required');

  const cookieTzOffset = cookie.match(regexp)?.[2];

  invariant(cookieTzOffset, 'cookie tzOffset is required');

  const timeZone = getTimeZoneFromRequest(request);

  console.log({ timeZone });

  return json({ user, observableRoutes, timeZoneId: timeZone.id });
}

function App() {
  useTimeZoneSync();

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
