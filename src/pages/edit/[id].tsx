import { Button, Checkbox, Flex, Heading, Icon, Stack } from '@chakra-ui/react';
import type { Book, CategoryType } from '@prisma/client';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../../components/Form/Input';
import { Select } from '../../components/Form/Select';
import { Layout } from '../../components/Layout';
import { prisma } from '../../server/db/client';
import { categoryOptions } from '../../utils/selectOptions';
import { trpc } from '../../utils/trpc';
import Image from 'next/image';
import LoadingSVG from '../../assets/images/button-loader.svg';

type FormInputs = {
  bookName: string;
  category: string;
  volumes: string;
  completed: boolean;
};

const EditBook = (props: { book: Book }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      bookName: props.book.name,
      category: props.book.category,
      completed: props.book.isCompleted,
      volumes: String(props.book.numberOfVolumes),
    },
  });

  const { mutate, isLoading } = trpc.useMutation(['book.update'], {
    onSuccess: () => {
      router.back();
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    await mutate({
      id: props.book.id,
      name: data.bookName,
      category: data.category as typeof CategoryType[keyof typeof CategoryType],
      isCompleted: Boolean(data.completed),
      numberOfVolumes: Number(data.volumes),
    });
  };

  return (
    <Layout>
      <Flex w="100vw" justify="center">
        <Flex
          as="form"
          w="100%"
          maxW={540}
          bg="gray.800"
          pt="8"
          pr="8"
          pb="4"
          pl="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Heading textAlign="center" size="lg" mb="8">
            Add new book
          </Heading>
          <Stack spacing="4">
            <Input
              type="text"
              label="Name"
              {...register('bookName')}
              isDisabled={isLoading}
            />
            <Select
              label="Category"
              options={categoryOptions()}
              {...register('category')}
              isDisabled={isLoading}
            />
            <Input
              label="Volumes"
              type="number"
              w={140}
              {...register('volumes')}
              isDisabled={isLoading}
            />
          </Stack>

          <Checkbox
            mt="4"
            colorScheme="pink"
            size="lg"
            {...register('completed')}
            isDisabled={isLoading}
          >
            Completed
          </Checkbox>
          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isDisabled={isLoading}
          >
            {isLoading ? (
              <Icon as={Image} src={LoadingSVG} alt="Adding book..." />
            ) : (
              'Update'
            )}
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id || typeof params.id !== 'string') {
    return {
      notFound: true,
    };
  }
  const bookId = params.id;

  const bookInfo = await prisma.book.findFirst({
    where: { id: { equals: bookId } },
    select: {
      id: true,
      isCompleted: true,
      name: true,
      numberOfVolumes: true,
      category: true,
    },
  });

  if (!bookInfo) {
    return {
      notFound: true,
    };
  }

  return { props: { book: bookInfo }, revalidate: 60 };
};

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export default EditBook;
