import React from 'react';
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
  Input,
  Image as ChakraImage,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { RiAddLine, RiSearchLine } from 'react-icons/ri';
import { CgArrowUpR, CgArrowDownR } from 'react-icons/cg';
import { trpc } from '../utils/trpc';
import { Layout } from './Layout';
import LoadingSVG from '../assets/images/loader.svg';
import Image from 'next/image';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type SortingState,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Book } from '@prisma/client';
import { columns } from '../utils/table/allBooksColumns';
import { isEven } from '../utils/isEven';
import { DebounceInput } from 'react-debounce-input';
import Link from 'next/link';

export const ListAll = () => {
  const { data: session } = useSession();

  const { data, isLoading, refetch } = trpc.useQuery([
    'book.getAll',
    { userId: session?.user?.id || '' },
  ]);

  const { mutate, isLoading: isLoadingMutation } = trpc.useMutation(
    ['book.updateVolumesById'],
    {
      onSuccess: async () => {
        return await refetch();
      },
    }
  );

  const stableData = React.useMemo(() => data, [data]);
  const stableColumns = React.useMemo(
    () => columns(mutate, isLoadingMutation),
    [mutate, isLoadingMutation]
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data: stableData || ([] as Array<Book>),
    columns: stableColumns,
    state: { sorting, globalFilter, columnVisibility: { id: false } },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const setFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  return (
    <Layout>
      <Box flex="1" borderRadius={8} bg="gray.800" p="8" w="100%">
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
              as={DebounceInput}
              color="gray.50"
              debounceTimeout={500}
              variant="unstyled"
              px="4"
              mr="4"
              placeholder="Search"
              _placeholder={{
                color: 'gray.400',
              }}
              onChange={setFilter}
            />
            <Icon as={RiSearchLine} fontSize="20" />
          </Flex>
          <Link href="/create" title="Add new book">
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              _hover={{
                cursor: 'pointer',
              }}
            >
              Add new
            </Button>
          </Link>
        </Flex>

        {isLoading ? (
          <Flex justify="center" align="center" pt="10">
            <ChakraImage as={Image} src={LoadingSVG} alt="Loading..." />
          </Flex>
        ) : (
          <Table colorScheme="whiteAlpha">
            <Thead>
              {table.getHeaderGroups().map(headerGroup => {
                return (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => (
                      <Th key={header.id} w={index === 0 ? 'md' : '8'}>
                        {header.isPlaceholder ? null : (
                          <Flex
                            columnGap="2"
                            align="center"
                            _hover={{
                              cursor: header.column.getCanSort()
                                ? 'pointer'
                                : 'default',
                            }}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: (
                                <Icon
                                  as={CgArrowUpR}
                                  fontSize="17"
                                  color="pink.500"
                                />
                              ),
                              desc: (
                                <Icon
                                  as={CgArrowDownR}
                                  fontSize="17"
                                  color="pink.500"
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                          </Flex>
                        )}
                      </Th>
                    ))}
                  </Tr>
                );
              })}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row, index) => (
                <Tr key={row.id} bg={isEven(index) ? 'gray.900' : 'gray.800'}>
                  {row.getVisibleCells().map((cell, index) => (
                    <Td
                      key={cell.id}
                      textAlign={!isEven(index) ? 'center' : 'left'}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Layout>
  );
};
