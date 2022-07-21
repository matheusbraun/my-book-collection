import { Box, Button, HStack, Icon, Text } from '@chakra-ui/react';
import type { Book } from '@prisma/client';
import type { Table } from '@tanstack/react-table';
import { Input } from './Form/Input';
import { Select } from './Form/Select';
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from 'react-icons/hi';

type PaginationProps = {
  table: Table<Book>;
};

export const Pagination = ({ table }: PaginationProps) => {
  const getEntriesInfo = () => {
    const pageSize = table.getState().pagination.pageSize;
    const firstEntry = pageSize + 1 - pageSize;
    const lastEntry = pageSize;
    const totalEntries = table.getPageCount() * pageSize;

    return (
      <>
        <strong>{firstEntry}</strong> - <strong>{lastEntry}</strong> of{' '}
        <strong>{totalEntries}</strong>
      </>
    );
  };

  return (
    <HStack mt="8" justify="space-between" align="center">
      <HStack>
        <Text w="10rem">{getEntriesInfo()}</Text>
        <Select
          name="numberOfRows"
          options={[
            { text: 'Show 10', value: '10' },
            { text: 'Show 20', value: '20' },
            { text: 'Show 30', value: '30' },
            { text: 'Show 40', value: '40' },
            { text: 'Show 50', value: '50' },
          ]}
          w="8rem"
          h="8"
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value));
          }}
        />
      </HStack>
      <HStack>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          colorScheme="pink"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          _disabled={{
            bg: 'pink.500',
            cursor: 'default',
          }}
        >
          <Icon as={HiChevronDoubleLeft} fontSize="16" />
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          colorScheme="pink"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          _disabled={{
            bg: 'pink.500',
            cursor: 'default',
          }}
        >
          <Icon as={HiChevronLeft} fontSize="16" />
        </Button>
        <Text>
          <strong>{table.getState().pagination.pageIndex + 1}</strong>/
          <strong>{table.getPageCount()}</strong>
        </Text>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          colorScheme="pink"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          _disabled={{
            bg: 'pink.500',
            cursor: 'default',
          }}
        >
          <Icon as={HiChevronRight} fontSize="16" />
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          w="4"
          colorScheme="pink"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          _disabled={{
            bg: 'pink.500',
            cursor: 'default',
          }}
        >
          <Icon as={HiChevronDoubleRight} fontSize="16" />
        </Button>
      </HStack>
    </HStack>
  );
};
