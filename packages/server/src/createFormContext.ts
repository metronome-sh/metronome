import { createRemixRequest } from '@remix-run/express/dist/server';
import formidable from 'formidable';
import { type Schema, type ZodError } from 'zod';

import { type ExpressRequest, type ExpressResponse } from './server.types';

function formatZodError(error: ZodError): string {
  return error.errors
    .map((err) => {
      const field = err.path.join('.');
      const message = err.message;
      return `${field ? field + ': ' : ''}${message}`;
    })
    .join(', ');
}

// function parseUrlEncoded(req: ExpressRequest) {
//   return new Promise((resolve, reject) => {
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk.toString();
//     });
//     req.on('end', () => {
//       console.log({ body });
//       try {
//         const parsed = Object.fromEntries(new URLSearchParams(body));
//         resolve(parsed);
//       } catch (err) {
//         console.log({ err });
//         reject(err);
//       }
//     });
//     req.on('error', (err) => {
//       console.log({ err });
//       reject(err);
//     });
//   });
// }

export async function createFormContext({
  request,
  response,
}: {
  request: ExpressRequest;
  response: ExpressResponse;
}) {
  // const remixRequest = createRemixRequest(request, response);

  let formData: FormData;

  try {
    if (['post', 'put'].includes(request.method.toLocaleLowerCase())) {
      // const parsed = await parseUrlEncoded(request);

      // console.log({ parsed });

      formData = new FormData();
    } else {
      formData = new FormData();
    }

    // formData = await remixRequest.formData();
  } catch (error) {
    console.log(error);
    formData = new FormData();
  }

  const formDataObject = Object.fromEntries(formData.entries());

  console.log({ formDataObject });

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
