import { Flex, Text, Box, Avatar, Icon } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';

export const Header = () => {
  const { data: session } = useSession();

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
      justify="space-evenly"
    >
      <Text fontSize="2xl" fontWeight="700" letterSpacing="tight" w="64">
        mybookcollection
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>

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
    </Flex>
  );
};
