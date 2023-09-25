export { createHandler } from './createHandler';
import { createHandler } from './createHandler';

export const handle = async (request: Request) => {
  return createHandler()({ request });
};
