import { Box, Stack, Text, Link as ChakraLink, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { RiDashboardLine } from 'react-icons/ri';
import { GiBookshelf, GiBlackBook } from 'react-icons/gi';
import { useSession } from 'next-auth/react';

type SidebarProps = {
  userId?: string;
};

export const Sidebar = ({ userId }: SidebarProps) => {
  const { data: session } = useSession();

  if (!session && userId) {
    return (
      <Box as="aside" w="64" mr="8">
        <Stack spacing="12" align="flex-start">
          <Box>
            <Text fontWeight="700" color="gray.400" fontSize="sm">
              MENU
            </Text>
            <Link href={`/share/${userId}`} title="All">
              <ChakraLink display="flex" alignItems="center" mt="8">
                <Icon as={GiBookshelf} fontSize="20" />
                <Text ml="4" fontWeight="500">
                  All Books
                </Text>
              </ChakraLink>
            </Link>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="700" color="gray.400" fontSize="sm">
            MENU
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link href="/" title="All">
              <ChakraLink display="flex" alignItems="center">
                <Icon as={GiBookshelf} fontSize="20" />
                <Text ml="4" fontWeight="500">
                  All Books
                </Text>
              </ChakraLink>
            </Link>
            <Link href="/dashboard" title="Dashboard">
              <ChakraLink display="flex" alignItems="center">
                <Icon as={RiDashboardLine} fontSize="20" />
                <Text ml="4" fontWeight="500">
                  Dashboard
                </Text>
              </ChakraLink>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
