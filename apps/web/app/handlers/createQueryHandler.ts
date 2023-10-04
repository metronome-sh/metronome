import {
  FilterObject,
  mergeFilterOptionsWithSearch,
  toMap,
} from '#app/filters';

export async function createQueryHandler({ request }: { request: Request }) {
  const searchParams = new URL(request.url).searchParams;

  function get<T extends string>(key: string) {
    return searchParams.get(key) as T | null;
  }

  async function filters<
    T extends string,
    ServerParse,
    R extends Record<string, FilterObject<T, ServerParse>>,
  >(
    filtersObj: R,
  ): Promise<{
    [RK in keyof R]: Awaited<ReturnType<R[RK]['server']['parse']>>;
  }> {
    const filterEntries = Object.entries(filtersObj);

    const filterObjects = filterEntries.map(([, filberObject]) => filberObject);

    const search = new URLSearchParams(new URL(request.url).search);

    const ids = filterEntries.map(([, filter]) => filter.filterId);

    // Conserve the order of the filters
    // TODO do this inside the mergeFilterOptionsWithSearch function instead
    const options = mergeFilterOptionsWithSearch(search, filterObjects).sort(
      (a, b) => {
        const aIndex = ids.indexOf(a.filterId);
        const bIndex = ids.indexOf(b.filterId);
        return aIndex - bIndex;
      },
    );

    const map = toMap(filterObjects);

    const parsed = await Promise.all(
      options.map(async (option) => {
        const filter = map[option.filterId];
        return filter.server.parse(option, request, filter);
      }),
    );

    return Object.fromEntries(
      parsed.map((p, i) => [filterEntries[i][0], p]),
    ) as {
      [RK in keyof R]: Awaited<ReturnType<R[RK]['server']['parse']>>;
    };
  }
  return { get, filters };
}
