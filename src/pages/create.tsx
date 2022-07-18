import { Button, Checkbox, Flex, Heading, Stack, Icon } from '@chakra-ui/react';
import { CategoryType } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input';
import { Select } from '../components/Form/Select';
import { Layout } from '../components/Layout';
import { categoryOptions } from '../utils/selectOptions';
import { trpc } from '../utils/trpc';
import Image from 'next/image';
import LoadingSVG from '../assets/images/button-loader.svg';

type FormInputs = {
  bookName: string;
  category: string;
  volumes: string;
  completed: boolean;
};

const CreateBook = () => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  const { mutate, isLoading } = trpc.useMutation(['book.create'], {
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    await mutate({
      name: data.bookName,
      category: data.category as typeof CategoryType[keyof typeof CategoryType],
      numberOfVolumes: Number(data.volumes),
      isCompleted: data.completed,
      userId: session?.user?.id || '',
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
              'Create'
            )}
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default CreateBook;
