import type { Config } from 'drizzle-kit';
import { env } from '@metronome/env';

export default {
  schema: './src/schema.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.db().url,
  },
} satisfies Config;
