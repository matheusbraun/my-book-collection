import React from 'react';
import {
  Flex,
  Heading,
  Input,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Image as ChakraImage,
} from '@chakra-ui/react';
import type { Book, User } from '@prisma/client';
import {
  flexRender,
  type SortingState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import type { GetStaticProps } from 'next';
import { DebounceInput } from 'react-debounce-input';
import { CgArrowUpR, CgArrowDownR } from 'react-icons/cg';
import { RiSearchLine } from 'react-icons/ri';
import { Layout } from '../../components/Layout';
import { prisma } from '../../server/db/client';
import { isEven } from '../../utils/isEven';
import { trpc } from '../../utils/trpc';
import Image from 'next/image';
import LoadingSVG from '../../assets/images/loader.svg';
import { shareColumns } from '../../utils/table/allBooksShareColumns';
import { Pagination } from '../../components/Pagination';

const ShareBooksListPage = (props: { user: User }) => {
  const { data, isLoading } = trpc.useQuery([
    'book.getAll',
    { userId: props.user.id || '' },
  ]);

  const stableData = React.useMemo(() => data, [data]);
  const stableColumns = React.useMemo(() => shareColumns, []);

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
    getPaginationRowModel: getPaginationRowModel(),
  });

  const setFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  return (
    <Layout userId={props.user.id}>
      <Box borderRadius={8} bg="gray.800" p="8" w="100%">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="400">
            All books from {props.user.name}
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
        </Flex>

        {isLoading ? (
          <Flex justify="center" flex="1" align="center" pt="10">
            <ChakraImage as={Image} src={LoadingSVG} alt="Loading..." />
          </Flex>
        ) : (
          <>
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
                        textAlign={index === 0 ? 'left' : 'center'}
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
            <Pagination table={table} numberOfRows={Number(data?.length)} />
          </>
        )}
      </Box>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id || typeof params.id !== 'string') {
    return {
      notFound: true,
    };
  }
  const userId = params.id;

  const userInfo = await prisma.user.findFirst({
    where: { id: { equals: userId } },
  });

  if (!userInfo) {
    return {
      notFound: true,
    };
  }

  return { props: { user: userInfo }, revalidate: 60 };
};

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export default ShareBooksListPage;
