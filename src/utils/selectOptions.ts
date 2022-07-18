import { CategoryType } from '@prisma/client';

export const categoryOptions = () => {
  const options = Object.keys(CategoryType).map(key => {
    return { value: key, text: key };
  });

  return options;
};
