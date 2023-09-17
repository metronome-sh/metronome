import dotenv from 'dotenv';
import { invariant } from 'ts-invariant';

dotenv.config({ path: '../../.env' });

export function db() {
  invariant(process.env.DB_DATABASE, 'DB_DATABASE env is not defined');
  invariant(process.env.DB_USER, 'DB_USER env is not defined');
  invariant(process.env.DB_PASSWORD, 'DB_PASSWORD env is not defined');
  invariant(process.env.DB_HOST, 'DB_HOST env is not defined');

  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const database = process.env.DB_DATABASE;

  const url = `postgres://${user}:${password}@${host}/${database}`;

  return { url };
}
