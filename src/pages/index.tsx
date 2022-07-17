import { Flex, Text } from '@chakra-ui/react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Layout } from '../components/Layout';
import { SignIn } from '../components/SignIn';
import { getAuthSession } from '../server/common/getAuthSession';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return <SignIn />;
  }

  const { data } = trpc.useQuery([
    'book.getAll',
    { userId: session.user.id || '' },
  ]);

  return (
    <Layout>
      <Flex w="100%">
        <Text colorScheme="whiteAlpha">{JSON.stringify(data)}</Text>
      </Flex>
    </Layout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      session: await getAuthSession(ctx),
    },
  };
};

export default Home;
