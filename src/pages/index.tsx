import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { SignIn } from '../components/SignIn';

const Home: NextPage = () => {
  const { data } = useSession();

  if (!data) {
    return <SignIn />;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default Home;
