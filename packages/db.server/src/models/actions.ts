import { actions } from '../schema';
import { ActionEventSchema } from '../schemaValidation';
import { ActionEvent } from '../types';
import {
  createRemixFunctionInsert,
  createRemixFunctionOverview,
  createRemixFunctionOverviewSeries,
  createRemixFunctionWatch,
} from '../utils/remixFunctions';

export function isActionEvent(event: unknown): event is ActionEvent {
  const result = ActionEventSchema.safeParse(event);
  return result.success;
}

export const insert = createRemixFunctionInsert(actions);

export const overview = createRemixFunctionOverview(actions);

export const overviewSeries = createRemixFunctionOverviewSeries(actions);

export const watch = createRemixFunctionWatch(actions);
