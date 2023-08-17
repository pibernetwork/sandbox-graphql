import { z } from 'zod';
import { MongoDbFieldError } from '../generics/types.js';

export function extractValidationMessages<T>(
  e: z.ZodError
): MongoDbFieldError<T>[] {
  const { issues } = e;

  const errors: MongoDbFieldError<T>[] = issues.map((issue) => {
    const key = issue.path && (issue.path[0] as keyof T);

    if (!key) {
      throw new Error('Missing field path in zod validation');
    }
    const message = issue.message;
    const type = issue.code;

    return {
      key,
      type,
      message
    };
  });

  return errors;
}
