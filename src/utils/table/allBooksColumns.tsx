import { Button, HStack, Icon, Text } from '@chakra-ui/react';
import { RiAddLine } from 'react-icons/ri';
import type { Book } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    cell: info => <Text>{info.getValue()}</Text>,
    enableHiding: true,
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: info => <Text>{info.getValue()}</Text>,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: info => (
      <Text textTransform="capitalize">
        {(info.getValue() as String)?.toLowerCase()}
      </Text>
    ),
    id: 'category',
  },
  {
    accessorKey: 'numberOfVolumes',
    header: 'Volumes',
    cell: info => (
      <HStack justify="flex-end" spacing="2">
        <Text>{String(info.getValue()).padStart(2, '0')}</Text>
        <Button
          size="xs"
          colorScheme="purple"
          onClick={() => window.alert(info.row.getValue('id'))}
        >
          <Icon as={RiAddLine} fontSize="14" />
        </Button>
      </HStack>
    ),
  },
  {
    accessorKey: 'isCompleted',
    header: 'Completed',
    cell: info => (info.getValue() ? <Text>Yes</Text> : <Text>No</Text>),
    id: 'completed',
  },
];
