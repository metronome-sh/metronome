import { type Schema, z, type ZodError } from 'zod';

function formatZodError(error: ZodError): string {
  return error.errors
    .map((err) => {
      const field = err.path.join('.');
      const message = err.message;
      return `${field ? field + ': ' : ''}${message}`;
    })
    .join(', ');
}

export async function createFormHandler({ request }: { request: Request }) {
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

  function validate<T, S extends Schema<T>>(schema: S): z.infer<S> {
    const result = schema.safeParse(formDataObject);

    if (!result.success) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
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
