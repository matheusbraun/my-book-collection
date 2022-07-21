import { Book } from '@prisma/client';

export const getTotalNumberOfVolumes = (data?: Array<Book>) => {
  if (!data) return 0;

  return data.reduce((acc, obj) => {
    return acc + obj.numberOfVolumes;
  }, 0);
};
