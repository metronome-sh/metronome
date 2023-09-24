import type {
  LoaderFunctionArgs as RemixLoaderArgs,
  ActionFunctionArgs as RemixActionArgs,
} from '@remix-run/node';

import type { GetLoadContextFunction } from '@remix-run/express';
import type { createQueryContext } from './createQueryContext';
import type { createFormContext } from './createFormContext';

export type ExpressRequest = Parameters<GetLoadContextFunction>[0];

export type ExpressResponse = Parameters<GetLoadContextFunction>[1];

export type QueryContext = Awaited<ReturnType<typeof createQueryContext>>;

export type FormContext = Awaited<ReturnType<typeof createFormContext>>;

export type MetronomeContext = {
  form: FormContext;
  query: QueryContext;
  // session: SessionContext;
};

export type MetronomeLoaderFunctionArgs = RemixLoaderArgs & {
  context: MetronomeContext;
};

export type MetronomeActionFunctionArgs = RemixActionArgs & {
  context: MetronomeContext;
};
