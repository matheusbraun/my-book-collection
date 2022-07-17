import { Button, Flex, HStack, Text, Icon, Heading } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

export const SignIn = () => {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW={400}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Heading size="lg" justifyContent="center">
          Please Sign In below
        </Heading>
        <Button
          mt="6"
          colorScheme="pink"
          size="lg"
          onClick={() => signIn('google')}
        >
          <HStack>
            <Text> Sign In with Google </Text>
            <Icon as={FaGoogle} fontSize="16" />
          </HStack>
        </Button>
      </Flex>
    </Flex>
  );
};
