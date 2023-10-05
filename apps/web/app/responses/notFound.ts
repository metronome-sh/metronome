export function notFound(options?: {
  headers?: Record<string, string>;
}): Response {
  return new Response(null, { headers: options?.headers, status: 404 });
}
