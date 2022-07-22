import { CategoryType } from '@prisma/client';
import { z } from 'zod';

const trimString = (u: unknown) => (typeof u === 'string' ? u.trim() : u);

export const schema = z.object({
  bookName: z.preprocess(
    trimString,
    z
      .string({ required_error: 'Book name is required.' })
      .min(1, { message: 'Book name is required.' })
      .min(3, { message: 'Book name must have at least 3 letters.' })
  ),
  category: z.nativeEnum(CategoryType, {
    invalid_type_error: 'Category type invalid.',
    required_error: 'Category is required.',
  }),
  volumes: z
    .number({
      required_error: 'Volumes is required.',
      invalid_type_error: 'Volume is required.',
    })
    .min(1, { message: 'Volumes must be greater than 0.' }),
});
