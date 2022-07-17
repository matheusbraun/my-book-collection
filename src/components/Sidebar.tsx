import { Box, Stack, Text, Link as ChakraLink, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { RiDashboardLine, RiBookLine } from 'react-icons/ri';

export const Sidebar = () => (
  <Box as="aside" w="64" mr="8">
    <Stack spacing="12" align="flex-start">
      <Box>
        <Text fontWeight="700" color="gray.400" fontSize="sm">
          CATEGORY
        </Text>
        <Stack spacing="4" mt="8" align="stretch">
          <Link href="/books" title="Books">
            <ChakraLink display="flex" alignItems="center">
              <Icon as={RiBookLine} fontSize="20" />
              <Text ml="4" fontWeight="500">
                Books
              </Text>
            </ChakraLink>
          </Link>
          <Link href="/mangas" title="Mangas">
            <ChakraLink display="flex" alignItems="center">
              <Icon as={RiBookLine} fontSize="20" />
              <Text ml="4" fontWeight="500">
                Mangas
              </Text>
            </ChakraLink>
          </Link>
          <Link href="/manhwas" title="Manhwas">
            <ChakraLink display="flex" alignItems="center">
              <Icon as={RiBookLine} fontSize="20" />
              <Text ml="4" fontWeight="500">
                Manhwas
              </Text>
            </ChakraLink>
          </Link>
          <Link href="/comics" title="Comics">
            <ChakraLink display="flex" alignItems="center">
              <Icon as={RiBookLine} fontSize="20" />
              <Text ml="4" fontWeight="500">
                Comics
              </Text>
            </ChakraLink>
          </Link>
        </Stack>
      </Box>
      <Box>
        <Text fontWeight="700" color="gray.400" fontSize="sm">
          ANALYTICS
        </Text>
        <Stack spacing="4" mt="8" align="stretch">
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
