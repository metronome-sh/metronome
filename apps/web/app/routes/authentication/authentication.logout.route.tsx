import { ActionFunctionArgs } from '@remix-run/node';

import { handle } from '#app/handlers';

export async function action({ request }: ActionFunctionArgs) {
  const { auth } = await handle(request);

  await auth.logout({
    redirectTo: '/authentication/grant',
  });
}
