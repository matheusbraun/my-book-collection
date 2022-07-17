import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Input,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine, RiSearchLine } from 'react-icons/ri';
import { Layout } from './Layout';

export const ListAll = () => {
  return (
    <Layout>
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="400">
            All books
          </Heading>
          <Flex
            as="label"
            flex="1"
            py="2"
            px="8"
            ml="6"
            maxW={400}
            alignSelf="center"
            color="gray.200"
            position="relative"
            bg="gray.900"
            borderRadius="full"
          >
            <Input
              color="gray.50"
              variant="unstyled"
              px="4"
              mr="4"
              placeholder="Search"
              _placeholder={{
                color: 'gray.400',
              }}
            />
            <Icon as={RiSearchLine} fontSize="20" />
          </Flex>
          <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="pink"
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          >
            Add new
          </Button>
        </Flex>

        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th w="8">Category</Th>
              <Th w="8">Volumes</Th>
              <Th w="8">Completed</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr bg="gray.900">
              <Td>
                <Text>My Hero Academia</Text>
              </Td>
              <Td textAlign="center">
                <Text>Manga</Text>
              </Td>
              <Td textAlign="center">
                <Text>32</Text>
              </Td>
              <Td textAlign="center">
                <Text>No</Text>
              </Td>
              <Td textAlign="right">
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="purple"
                  leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text>Monster</Text>
              </Td>
              <Td textAlign="center">
                <Text>Manga</Text>
              </Td>
              <Td textAlign="center">
                <Text>09</Text>
              </Td>
              <Td textAlign="center">
                <Text>Yes</Text>
              </Td>
              <Td textAlign="right">
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="purple"
                  leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
            <Tr bg="gray.900">
              <Td>
                <Text>The Boys</Text>
              </Td>
              <Td textAlign="center">
                <Text>Comic</Text>
              </Td>
              <Td textAlign="center">
                <Text>12</Text>
              </Td>
              <Td textAlign="center">
                <Text>Yes</Text>
              </Td>
              <Td textAlign="right">
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="purple"
                  leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Layout>
  );
};
