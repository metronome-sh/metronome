export async function createQueryHandler({ request }: { request: Request }) {
  const searchParams = new URL(request.url).searchParams;

  function get<T extends string>(key: string) {
    return searchParams.get(key) as T | null;
  }

  return { get };
}
