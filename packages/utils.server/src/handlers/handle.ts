import { createAuthHandle } from './createAuthHandle';
import { createFormHandle } from './createFormHandle';

export async function handle(request: Request) {
  const form = await createFormHandle(request);
  const auth = await createAuthHandle(request);

  return { form, auth };
}
