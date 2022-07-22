import { Flex, Text, Box, Avatar, Icon, Button } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSignOutAlt } from 'react-icons/fa';

export const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const isShareRoute = router.route.includes('share');

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
      justify={!session && !isShareRoute ? 'flex-start' : 'space-between'}
    >
      <Link href="/" title="Go to Home">
        <Text
          fontSize="2xl"
          fontWeight="700"
          letterSpacing="tight"
          w="64"
          _hover={{ cursor: 'pointer' }}
        >
          mybookcollection
          <Text as="span" ml="1" color="pink.500">
            .
          </Text>
        </Text>
      </Link>

      {session && (
        <Flex align="center" ml="auto">
          <Flex align="center">
            <Box mr="4" textAlign="right">
              <Text>{session?.user?.name}</Text>
              <Text color="gray.300" fontSize="sm">
                {session?.user?.email}
              </Text>
            </Box>
            <Avatar
              size="md"
              name={session?.user?.name ?? undefined}
              src={session?.user?.image ?? undefined}
            />
            <Icon
              as={FaSignOutAlt}
              ml="8"
              fontSize="lg"
              color="pink.500"
              title="Sign Out"
              _hover={{
                cursor: 'pointer',
              }}
              onClick={() => signOut()}
            />
          </Flex>
        </Flex>
      )}
      {!session && isShareRoute ? (
        <Link href="/">
          <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="pink"
            _hover={{
              cursor: 'pointer',
            }}
            title="Go to sign in"
          >
            Sign In
          </Button>
        </Link>
      ) : null}
    </Flex>
  );
};
