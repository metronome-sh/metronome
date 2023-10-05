import { loaders } from '../schema';
import { LoaderEventSchema } from '../schemaValidation';
import { LoaderEvent } from '../types';
import {
  createRemixFunctionInsert,
  createRemixFunctionOverview,
  createRemixFunctionOverviewSeries,
  createRemixFunctionWatch,
} from '../utils/remixFunctions';

export function isLoaderEvent(event: unknown): event is LoaderEvent {
  const result = LoaderEventSchema.safeParse(event);
  return result.success;
}

export const insert = createRemixFunctionInsert(loaders);

export const overview = createRemixFunctionOverview(loaders);

export const overviewSeries = createRemixFunctionOverviewSeries(loaders);

export const watch = createRemixFunctionWatch(loaders);
