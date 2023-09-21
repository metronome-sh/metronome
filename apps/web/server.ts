import path from 'path';
import { createRequestHandler } from '@remix-run/express';
import { installGlobals, broadcastDevReady } from '@remix-run/node';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import chokidar from 'chokidar';
import sourceMapSupport from 'source-map-support';

sourceMapSupport.install();
installGlobals();

const BUILD_PATH = path.resolve('build/index.js');
const VERSION_PATH = path.resolve('build/version.txt');

const build = reimportServer();

const app = express();

app.use(compression());

app.disable('x-powered-by');

// Remix fingerprints its assets so we can cache forever.
app.use(
  '/build',
  express.static('public/build', { immutable: true, maxAge: '1y' }),
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('public', { maxAge: '1h' }));

app.use(morgan('tiny'));

app.all(
  '*',
  process.env.NODE_ENV === 'development'
    ? createDevRequestHandler()
    : createRequestHandler({
        build,
        mode: process.env.NODE_ENV,
      }),
);
const port = Number(process.env.PORT || 3000);

app.listen(port, '0.0.0.0', async () => {
  console.log(`Express server listening on port ${port}`);

  if (process.env.NODE_ENV === 'development') {
    await broadcastDevReady(build);
  }
});

/**
 * @returns {ServerBuild}
 */
function reimportServer() {
  // 1. manually remove the server build from the require cache
  Object.keys(require.cache).forEach((key) => {
    // if (key.startsWith(BUILD_PATH)) {
    delete require.cache[key];
    // }
  });

  // 2. re-import the server build
  return require(BUILD_PATH);
}

/**
 * @param {ServerBuild} initialBuild
 * @returns {import('@remix-run/express').RequestHandler}
 */
function createDevRequestHandler() {
  function handleServerUpdate() {
    const build = reimportServer();

    console.log({ buildVersion: build.assets.version });

    broadcastDevReady(build);
  }

  chokidar
    .watch(VERSION_PATH, {
      ignoreInitial: true,
    })
    .on('add', handleServerUpdate)
    .on('change', handleServerUpdate);

  // wrap request handler to make sure its recreated with the latest build for every request
  return async (req: any, res: any, next: any) => {
    try {
      return createRequestHandler({
        build,
        mode: 'development',
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
