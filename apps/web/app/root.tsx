import { json, type LinksFunction, type LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import favicon from '#app/../public/images/favicon.svg';
import faviconAlt from '#app/../public/images/favicon-alternate.png';
import faviconAltSvg from '#app/../public/images/favicon-alternate.svg';
import socialPreview from '#app/../public/images/social-preview.png';
import { EventProvider, getObservableRoutes } from '#app/events';
import { handle } from '#app/handlers';

import { useTimeZoneSync } from './hooks';
import styles from './tailwind.css';
import { getTimeZoneFromRequest } from './utils/timeZone';
const title = 'Metronome';
const metronomeUrl = 'https://metronome.sh';
// prettier-ignore
const description = "Delivering the best experience to users is critical for your success. Metronome lets you visualize how your Remix app performs from top to bottom.";
const image = `https://metronome.sh${socialPreview}`;

export const meta: MetaFunction = () => [
  { title: 'Metronome' },
  { description: 'Metronome for Remix Analytics' },
  { viewport: 'width=device-width, initial-scale=1' },
  { charset: 'utf-8' },
  { 'og:type': 'website' },
  { 'og:url': metronomeUrl },
  { 'og:title': title },
  { 'og:description': description },
  { 'og:image': image },
  { 'twitter:card': 'summary_large_image' },
  { 'twitter:url': metronomeUrl },
  { 'twitter:title': title },
  { 'twitter:description': description },
  { 'twitter:image': image },
];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'icon', href: favicon, type: 'image/svg+xml' },
  { rel: 'apple-touch-icon', href: faviconAlt },
  { rel: 'mask-icon', href: faviconAltSvg, color: '#fff' },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const { auth } = await handle(request);

  const user = await auth.user({ required: false });

  const observableRoutes = getObservableRoutes();

  const timeZone = getTimeZoneFromRequest(request);

  return json({
    user,
    observableRoutes,
    timeZoneId: timeZone.id,
  });
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
