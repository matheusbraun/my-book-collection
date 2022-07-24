import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Stack,
  Icon,
  useToast,
} from '@chakra-ui/react';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../utils/validation/schema';

type FormInputs = {
  bookName: string;
  category: string;
  volumes: string;
  completed: boolean;
};

const CreateBook = () => {
  const { data: session } = useSession();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ resolver: zodResolver(schema) });

  const { mutate, isLoading } = trpc.useMutation(['book.create'], {
    onSuccess: () => {
      reset();
      toast({
        description: 'Book successfuly created.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    },
    onError: () => {
      toast({
        title: 'Something went wrong.',
        description: 'Book was not created. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    await mutate({
      name: data.bookName,
      category: data.category as typeof CategoryType[keyof typeof CategoryType],
      numberOfVolumes: Number(data.volumes),
      isCompleted: Boolean(data.completed),
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
              errorMessage={errors.bookName && errors.bookName.message}
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
              {...register('volumes', { valueAsNumber: true })}
              isDisabled={isLoading}
              errorMessage={errors.volumes && errors.volumes.message}
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
