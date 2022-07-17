import type { GetServerSidePropsContext, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { ListAll } from '../components/ListAll';
import { SignIn } from '../components/SignIn';
import { getAuthSession } from '../server/common/getAuthSession';

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return <SignIn />;
  }

  return <ListAll />;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      session: await getAuthSession(ctx),
    },
  };
};

export default Home;
