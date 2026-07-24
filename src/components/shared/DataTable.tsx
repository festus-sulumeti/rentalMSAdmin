import { Loader2, Inbox } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  rowKey: (row: T) => string | number;
}

export default function DataTable<T>({
  columns,
  data,
  isLoading,
  error,
  emptyMessage = 'No records found.',
  rowKey,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center gap-2 rounded-md border border-border text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border border-destructive/30 bg-destructive/5 text-sm text-destructive">
        {error}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border text-sm text-muted-foreground">
        <Inbox className="h-5 w-5" />
        {emptyMessage}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.header} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={rowKey(row)}>
            {columns.map((col) => (
              <TableCell key={col.header} className={col.className}>
                {col.accessor(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
