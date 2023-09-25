import { handle } from '@metronome/utils.server';
import { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  const { auth } = await handle(request);

  await auth.logout({
    redirectTo: '/authentication/grant',
  });
}
