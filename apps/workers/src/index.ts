import { env } from '@metronome/env.server';
import { queues } from '@metronome/queues.server';

import { events } from './events';
import { metrics } from './metrics';
// import { aggregations } from './aggregations';

console.log('[workers]', 'Initializing queues');

queues.metrics.worker(metrics, env.when({ production: 10, development: 1 }));
queues.events.worker(events, env.when({ production: 10, development: 1 }));
// queues.aggregations.worker(aggregations, 1);
