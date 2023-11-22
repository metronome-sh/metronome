import { type ZodError } from 'zod';

export function formatZodError(error: ZodError): string {
  return error.errors
    .map((err) => {
      const field = err.path.join('.');
      const message = err.message;
      return `${field ? field + ': ' : ''}${message}`;
    })
    .join(', ');
}
