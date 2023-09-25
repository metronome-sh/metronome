import { createAuthHandler } from './createAuthHandler';
import { createFormHandler } from './createFormHandler';
import { createSessionHandler } from './createSessionHandler';

export function createHandler() {
  return async function handle({ request }: { request: Request }) {
    const session = createSessionHandler({ request });
    const form = await createFormHandler({ request });
    const auth = await createAuthHandler({ request, session, form });

    return { form, auth, session };
  };
}
