import type { Book } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';
import { Text } from '@chakra-ui/react';

export const shareColumns: ColumnDef<Book>[] = [
  {
    accessorKey: 'id',
    header: 'id',
    cell: info => <Text>{info.getValue()}</Text>,
    enableHiding: true,
    enableSorting: false,
    enableGlobalFilter: false,
    enableColumnFilter: false,
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
        {info.getValue() ? String(info.getValue()).toLowerCase() : undefined}
      </Text>
    ),
    id: 'category',
    enableGlobalFilter: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'numberOfVolumes',
    header: 'Volumes',
    enableGlobalFilter: false,
    enableColumnFilter: false,
    cell: info => {
      return info.getValue() ? (
        <Text>{String(info.getValue()).padStart(2, '0')}</Text>
      ) : undefined;
    },
  },
  {
    accessorKey: 'isCompleted',
    header: 'Completed',
    cell: info => (info.getValue() ? <Text>Yes</Text> : <Text>No</Text>),
    id: 'completed',
    enableGlobalFilter: false,
    enableColumnFilter: false,
  },
];
