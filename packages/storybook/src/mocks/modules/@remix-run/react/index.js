import fs from 'fs';
import path from 'path';

function findIndexJs(targetPackage, dir = __dirname) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    if (filePath.includes(targetPackage) && file === 'index.js') {
      console.log(`Found: ${filePath}`);
      return;
    }

    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      findIndexJs(targetPackage, filePath);
    }
  }
}

const remixRunReact = findIndexJs('@remix-run/react');

console.log({ remixRunReact });

// return require(remixRunReact);

// Export all the things from @remix-run/react
// export {
//   RemixBrowser,
//   Await,
//   Meta,
//   Links,
//   Scripts,
//   NavLink,
//   PrefetchPageLinks,
//   LiveReload,
//   useFetchers,
//   useLoaderData,
//   useRouteLoaderData,
//   useMatches,
//   useActionData,
//   ScrollRestoration,
//   RemixServer,
//   UNSAFE_RemixContext,
//   createPath,
//   generatePath,
//   matchPath,
//   matchRoutes,
//   parsePath,
//   resolvePath,
//   Form,
//   Outlet,
//   useAsyncError,
//   useAsyncValue,
//   isRouteErrorResponse,
//   useBeforeUnload,
//   useFormAction,
//   useHref,
//   useLocation,
//   useMatch,
//   useNavigationType,
//   useOutlet,
//   useOutletContext,
//   useParams,
//   useResolvedPath,
//   useRevalidator,
//   useRouteError,
//   useSearchParams,
//   unstable_useBlocker,
//   unstable_usePrompt,
// } from '@remix-run/react';

// // Overrides

// export { useNavigation } from './useNavigation.js';
// export { useFetcher } from './useFetcher.js';
// export { useSubmit } from './useSubmit.js';
// export { useNavigate } from './useNavigate.js';
// export { Link } from './Link.js/index.js';
