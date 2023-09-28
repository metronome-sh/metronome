import { GetLoadContextFunction } from '@remix-run/express';

import { createFormContext } from './createFormContext';
import { createQueryContext } from './createQueryContext';
import { type MetronomeContext } from './server.types';
// import { createSessionContext } from './session';

export const getMetronomeAppLoadContext: GetLoadContextFunction = async (
  request,
  response,
): Promise<MetronomeContext> => {
  const query = await createQueryContext({ request });
  const form = await createFormContext({ request, response });

  return { query, form };
};
