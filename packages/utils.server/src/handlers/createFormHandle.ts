import type { Schema, ZodError } from 'zod';

function formatZodError(error: ZodError): string {
  return error.errors
    .map((err) => {
      const field = err.path.join('.');
      const message = err.message;
      return `${field ? field + ': ' : ''}${message}`;
    })
    .join(', ');
}

export async function createFormHandle(request: Request) {
  let formData: FormData = new FormData();
  let formDataObject: Record<string, string> = {};

  if (['post', 'put'].includes(request.method.toLowerCase())) {
    formData = await request.clone().formData();
    formDataObject = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
  }

  function get(key: string): string | undefined {
    return formData.get(key) as string | undefined;
  }

  function validate<T>(schema: Schema<T>): T {
    const result = schema.safeParse(formDataObject);

    if (!result.success) {
      throw new Response(
        `Invalid form data: ${JSON.stringify(formatZodError(result.error))}`,
        {
          status: 400,
        },
      );
    }

    return result.data;
  }

  return { get, validate };
}
