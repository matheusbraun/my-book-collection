import { Box, Stack, Text, Link, Icon } from '@chakra-ui/react';
import { RiDashboardLine, RiBookLine } from 'react-icons/ri';

export const Sidebar = () => (
  <Box as="aside" w="64" mr="8">
    <Stack spacing="12" align="flex-start">
      <Box>
        <Text fontWeight="700" color="gray.400" fontSize="sm">
          CATEGORY
        </Text>
        <Stack spacing="4" mt="8" align="stretch">
          <Link display="flex" alignItems="center" href="/books" title="Books">
            <Icon as={RiBookLine} fontSize="20" />
            <Text ml="4" fontWeight="500">
              Books
            </Text>
          </Link>
          <Link
            display="flex"
            alignItems="center"
            href="/mangas"
            title="Mangas"
          >
            <Icon as={RiBookLine} fontSize="20" />
            <Text ml="4" fontWeight="500">
              Mangas
            </Text>
          </Link>
          <Link
            display="flex"
            alignItems="center"
            href="/manhwas"
            title="Manhwas"
          >
            <Icon as={RiBookLine} fontSize="20" />
            <Text ml="4" fontWeight="500">
              Manhwas
            </Text>
          </Link>
          <Link
            display="flex"
            alignItems="center"
            href="/comics"
            title="Comics"
          >
            <Icon as={RiBookLine} fontSize="20" />
            <Text ml="4" fontWeight="500">
              Comics
            </Text>
          </Link>
        </Stack>
      </Box>
      <Box>
        <Text fontWeight="700" color="gray.400" fontSize="sm">
          ANALYTICS
        </Text>
        <Stack spacing="4" mt="8" align="stretch">
          <Link
            display="flex"
            alignItems="center"
            href="/dashboard"
            title="Dashboard"
          >
            <Icon as={RiDashboardLine} fontSize="20" />
            <Text ml="4" fontWeight="500">
              Dashboard
            </Text>
          </Link>
        </Stack>
      </Box>
    </Stack>
  </Box>
);
