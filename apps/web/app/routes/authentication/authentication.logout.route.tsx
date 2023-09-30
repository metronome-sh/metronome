import { handle } from '@metronome/utils.server';
import { ActionFunctionArgs } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  const { auth } = await handle(request);

  await auth.logout({
    redirectTo: '/authentication/grant',
  });
}
