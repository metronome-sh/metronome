import { type Schema } from 'zod';

import { type ExpressRequest } from './server.types';

export async function createQueryContext({
  request, //  session,
}: {
  request: ExpressRequest;
  //   session: SessionContext;
}) {
  const search = new URLSearchParams(
    new URL(request.url, 'http://localhost').search,
  );

  const searchObject = Object.fromEntries(search);

  function get<T extends string>(key: string) {
    return searchObject[key] as T | undefined;
  }

  function validate<T>(schema: Schema<T>): T {
    const result = schema.safeParse(searchObject);

    if (!result.success) {
      throw new Response('Invalid query', { status: 400 });
    }

    return result.data;
  }

  // async function filters<
  //   T extends string,
  //   ServerParse,
  //   R extends Record<string, FilterObject<T, ServerParse>>
  // >(filtersObj: R): Promise<{ [RK in keyof R]: Awaited<ReturnType<R[RK]['server']['parse']>> }> {
  //   const filterEntries = Object.entries(filtersObj);

  //   const filters = filterEntries.map(([, f]) => f);

  //   const search = new URLSearchParams(new URL(request.url, 'http://localhost').search);

  //   const ids = filterEntries.map(([, filter]) => filter.filterId);

  //   // Conserve the order of the filters
  //   // TODO do this inside the mergeFilterOptionsWithSearch function instead
  //   const options = mergeFilterOptionsWithSearch(search, filters).sort((a, b) => {
  //     const aIndex = ids.indexOf(a.filterId);
  //     const bIndex = ids.indexOf(b.filterId);
  //     return aIndex - bIndex;
  //   });

  //   const map = toMap(filters);

  //   const parsed = await Promise.all(
  //     options.map(async (option) => {
  //       const filter = map[option.filterId];
  //       // TODO maybe convert filter to a class and include the helpers inside
  //       // Not very clean IMO
  //       return await filter.server.parse(option, { session }, filter);
  //     })
  //   );

  //   return Object.fromEntries(parsed.map((p, i) => [filterEntries[i][0], p])) as {
  //     [RK in keyof R]: Awaited<ReturnType<R[RK]['server']['parse']>>;
  //   };
  // }

  return { get, validate };
}
