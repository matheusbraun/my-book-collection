import { Box, Flex } from '@chakra-ui/react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
  userId?: string;
};

export const Layout = ({ children, userId }: LayoutProps) => (
  <Flex direction="column" minHeight="100vh" justify="space-between">
    <Box>
      <Header />

      <Flex w="100%" my="6" flex="grow" maxW={1480} mx="auto" px="6">
        <Sidebar userId={userId} />
        {children}
      </Flex>
    </Box>
    <Footer />
  </Flex>
);
