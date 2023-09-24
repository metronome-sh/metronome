import type { Schema } from 'zod';
import type { ExpressRequest, ExpressResponse } from './server.types';
import { createRemixRequest } from '@remix-run/express/dist/server';

export async function createFormContext({
  request,
  response,
}: {
  request: ExpressRequest;
  response: ExpressResponse;
}) {
  const remixRequest = createRemixRequest(request, response);

  let formData: FormData;

  try {
    formData = await remixRequest.formData();
  } catch (error) {
    formData = new FormData();
  }

  function get(key: string): string | undefined {
    return formData.get(key) as string | undefined;
  }

  async function validate<T>(schema: Schema<T>): Promise<T> {
    const body = await remixRequest.clone().formData();

    const result = schema.safeParse(Object.fromEntries(body.entries()));

    if (!result.success) {
      throw new Response('Invalid form data', { status: 400 });
    }

    return result.data;
  }

  return { get, validate };
}
