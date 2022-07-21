import { Flex } from '@chakra-ui/react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
  userId?: string;
};

export const Layout = ({ children, userId }: LayoutProps) => (
  <Flex direction="column" minHeight="100vh">
    <Header />

    <Flex w="100%" my="6" flex="1" maxW={1480} mx="auto" px="6">
      <Sidebar userId={userId} />
      {children}
    </Flex>

    <Footer />
  </Flex>
);
