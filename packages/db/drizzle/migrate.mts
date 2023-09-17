import { env } from '@metronome/env';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle as Drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import path from 'path';
import { fileURLToPath } from 'url';

const sql = postgres(env.db().url, { max: 1 });

export const drizzle = Drizzle(sql);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await migrate(drizzle, { migrationsFolder: `${__dirname}/migrations` });

console.log('Migrations complete');

process.exit(0);
