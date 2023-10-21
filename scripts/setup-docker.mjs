#! /usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Chalk } from 'chalk';
import boxen from 'boxen';

const chalk = new Chalk({ level: 3 });
const argv = yargs(hideBin(process.argv)).argv;

import { customAlphabet } from 'nanoid';
import fs from 'fs';

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const nanoid = customAlphabet(alphabet, 34);

// Read .env.example
const envExample = fs.readFileSync('./.env.example', 'utf-8');

const dbPassword = nanoid();

const redisPassword = nanoid();

// Replace secrets
// prettier-ignore
const updatedEnv = envExample
  .replace(/NODE_ENV=.*\n/, `NODE_ENV="production"\n`)
  .replace(/SESSION_SECRET=.*\n/, `SESSION_SECRET="${nanoid()}"\n`)
  .replace(/DB_READ_PASSWORD=.*\n/, `DB_READ_PASSWORD="${dbPassword}"\n`)
  .replace(/DB_WRITE_PASSWORD=.*\n/, `DB_WRITE_PASSWORD="${dbPassword}"\n`)
  .replace(/APP_URL=.*\n/, `APP_URL="${argv.url || "http://localhost"}"\n`)
  .replace(/APP_PORT=.*\n/, `APP_PORT="${argv.port || "3000"}"\n`)
  .replace(/REDIS_CACHE_PASSWORD=.*\n/, `REDIS_CACHE_PASSWORD="${redisPassword}"\n`)
  .replace(/REDIS_UNIQUE_PASSWORD=.*\n/, `REDIS_UNIQUE_PASSWORD="${redisPassword}"\n`)
  .replace(/MAXMIND_LICENSE_KEY=.*\n/, `MAXMIND_LICENSE_KEY="${argv.maxmindLicense ?? ''}"\n`);

// Write to new .env file
fs.writeFileSync('./.env', updatedEnv);

const text = `
✅ ${chalk.yellow('.env')} file created with secrets
🐳 ${chalk.yellow('docker-compose.yml')} created
`;

console.log(
  boxen(text, {
    // title: 'Docker deployment set up',
    padding: 0.5,
    borderColor: 'white',
  }),
);

console.log(
  boxen(
    `You may now run ${chalk.green('docker-compose up')} to start Metronome`,
    {
      padding: 0.5,
      borderColor: 'green',
    },
  ),
);
