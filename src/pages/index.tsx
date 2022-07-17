import { Text } from '@chakra-ui/react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Layout } from '../components/Layout';
import { SignIn } from '../components/SignIn';
import { getAuthSession } from '../server/common/getAuthSession';

const Home: NextPage = () => {
  const { data } = useSession();

  if (!data) {
    return <SignIn />;
  }

  return (
    <Layout>
      <Text colorScheme="whiteAlpha">
        Select a category on the sidebar to check the collection or you can{' '}
      </Text>
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
