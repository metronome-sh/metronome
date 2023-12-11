import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { env } from '@metronome/env.server';
import Bree from 'bree';

const bree = new Bree({
  root: path.join(path.dirname(fileURLToPath(import.meta.url)), 'jobs'),
  defaultExtension: 'ts',
  jobs: [
    {
      name: 'rotate-salt',
      interval: env.when({ production: 'at 12:00 am', development: '5m' }),
    },
  ],
});

await bree.start();
