import { Flex, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { SignIn } from '../components/SignIn';

const Home: NextPage = () => {
  const { data } = useSession();

  if (!data) {
    return <SignIn />;
  }

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        <Text colorScheme="whiteAlpha">
          Select a category on the sidebar to check the collection or you can{' '}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Home;
