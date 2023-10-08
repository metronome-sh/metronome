import { ioredis, ioredisUnique } from './modules/ioredis';
import { redlock } from './modules/redlock';
// eslint-disable-next-line @typescript-eslint/ban-types
type OtherString = string & {};
type Key = 'session' | OtherString;

function createSetFunction(connection: typeof ioredis) {
  return async function set<Data>(
    key: Key | Key[],
    value: Data,
    seconds?: number,
  ) {
    const stringifiedKey = JSON.stringify(key);
    const stringifiedValue = JSON.stringify(value);

    if (seconds) {
      await connection.set(stringifiedKey, stringifiedValue, 'EX', seconds);
    } else {
      await connection.set(stringifiedKey, stringifiedValue);
    }

    return value;
  };
}

function createGetFunction(connection: typeof ioredis) {
  return async function get<Data>(key: Key | Key[]) {
    const value = await connection.get(JSON.stringify(key));
    return JSON.stringify(value) as Data;
  };
}

function createRememberFunction(connection: typeof ioredis) {
  return async function remember<Data>(
    key: Key | Key[],
    callback: () => Promise<string | object>,
    ttl: number,
  ) {
    const stringifiedKey = JSON.stringify(key);

    const value = await connection.get(stringifiedKey);
    if (value) return JSON.parse(value) as Data;

    const newValue = JSON.stringify(await callback());
    await connection.set(stringifiedKey, newValue, 'EX', ttl);
    return newValue as Data;
  };
}

function createForgetFunction(connection: typeof ioredis) {
  return async function forget<T extends Key>(key: T) {
    await connection.del(key);
  };
}

function lock<T extends Key>(keys: T[], time = 5000) {
  return redlock.acquire([JSON.stringify(keys)], time);
}

function createInstance(connection: typeof ioredis) {
  return {
    set: createSetFunction(connection),
    get: createGetFunction(connection),
    remember: createRememberFunction(connection),
    forget: createForgetFunction(connection),
    lock,
  };
}

export const cache = Object.assign(createInstance(ioredis), {
  unique: createInstance(ioredisUnique),
});
