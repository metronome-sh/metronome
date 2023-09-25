import type { SessionStorage } from '@remix-run/node';
import { createCookieSessionStorage } from '@remix-run/node';
import { env } from '@metronome/env.server';

let sessionStorageInstance: SessionStorage;

function storage(): SessionStorage {
  if (!sessionStorageInstance) {
    sessionStorageInstance = createCookieSessionStorage({
      cookie: {
        name: env.session().sessionName,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: [env.session().sessionSecret],
        secure: env.production,
      },
    });
  }
  return sessionStorageInstance;
}

export function createSessionHandler({ request }: { request: Request }) {
  let cookie = request.headers.get('Cookie') ?? '';

  function instance() {
    return storage().getSession(cookie);
  }

  async function clear() {
    const session = await instance();
    const keys = Object.keys(session.data);
    keys.forEach((key) => session.unset(key));
  }

  async function set(
    data: Record<string, any>,
    options?: { replace?: boolean },
  ) {
    const session = await instance();

    if (options?.replace) await clear();

    Object.entries(data).forEach(([key, value]) => {
      session.set(key, value);
    });
  }

  async function unset(keys: string | string[]) {
    const session = await instance();

    if (Array.isArray(keys)) {
      keys.forEach((key) => session.unset(key));
    } else {
      session.unset(keys);
    }
  }

  async function flash(
    data: Record<string, any>,
    options?: { replace?: boolean },
  ) {
    const session = await instance();

    if (options?.replace) clear();

    Object.entries(data).forEach(([key, value]) => {
      session.flash(key, value);
    });
  }

  async function get<T extends any>(key: string) {
    const session = await instance();
    return session.get(key) as T | undefined;
  }

  async function all(keys: string[]) {
    const session = await instance();

    return keys.reduce(
      (acc, key) => {
        acc[key] = session.get(key);
        return acc;
      },
      {} as Record<string, any>,
    );
  }

  async function destroy() {
    const session = await instance();
    return (await storage()).destroySession(session);
  }

  /**
   * Commits the session with optional data to be set.
   * @param data
   * @returns string
   */
  async function commit(
    data?: Record<string, any>,
    options?: { flash?: boolean; replace?: boolean },
  ) {
    if (data) {
      if (options?.flash) {
        await flash(data, { replace: options?.replace });
      } else {
        await set(data, { replace: options?.replace });
      }
    }

    const session = await instance();

    return (await storage()).commitSession(session);
  }

  return {
    storage,
    instance,
    clear,
    set,
    unset,
    flash,
    get,
    all,
    destroy,
    commit,
  };
}
