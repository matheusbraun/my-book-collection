import { createRouter } from './context';
import { z } from 'zod';
import { CategoryType } from '@prisma/client';

export const bookRouter = createRouter()
  .mutation('create', {
    input: z.object({
      name: z.string(),
      userId: z.string(),
      category: z.nativeEnum(CategoryType),
      numberOfVolumes: z.number().min(1),
      isCompleted: z.boolean(),
    }),
    async resolve({ input, ctx }) {
      const book = await ctx.prisma.book.create({ data: { ...input } });
      return book;
    },
  })
  .query('getAll', {
    input: z.object({
      userId: z.string(),
      category: z.nativeEnum(CategoryType).nullish(),
    }),
    async resolve({ input, ctx }) {
      const book = await ctx.prisma.book.findMany({
        where: {
          userId: input.userId,
          category: input.category ? input.category : undefined,
        },
        orderBy: { name: 'asc' },
      });
      return book;
    },
  })
  .mutation('updateVolumesById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const book = await ctx.prisma.book.update({
        where: {
          id: input.id,
        },
        data: {
          numberOfVolumes: {
            increment: 1,
          },
        },
      });
      return book;
    },
  });
