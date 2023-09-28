import { type GetLoadContextFunction } from '@remix-run/express';
import {
  type ActionFunctionArgs as RemixActionArgs,
  type LoaderFunctionArgs as RemixLoaderArgs,
} from '@remix-run/node';

import { type createFormContext } from './createFormContext';
import { type createQueryContext } from './createQueryContext';

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
