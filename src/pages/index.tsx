import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Header } from '../components/Header';
import { SignIn } from '../components/SignIn';

const Home: NextPage = () => {
  const { data } = useSession();

  if (!data) {
    return <SignIn />;
  }

  return <Header />;
};

export default Home;
