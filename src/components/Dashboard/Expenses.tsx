import { Plus } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { type Column } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { useFetchList } from '@/hooks/useFetchList';
import type { Expense } from '@/types';

export default function Expenses() {
  const { data, isLoading, error } = useFetchList<Expense>('/expenses');

  const columns: Column<Expense>[] = [
    { header: 'Property', accessor: (row) => row.property_name ?? `#${row.property_id}` },
    { header: 'Category', accessor: (row) => <span className="capitalize">{row.category}</span> },
    { header: 'Description', accessor: (row) => row.description },
    {
      header: 'Amount',
      accessor: (row) => row.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' }),
    },
    { header: 'Date', accessor: (row) => new Date(row.incurred_at).toLocaleDateString() },
  ];

  return (
    <div>
      <PageHeader
        title="Expenses"
        description="Operating expenses recorded against each property."
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add expense
          </Button>
        }
      />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
        rowKey={(row) => row.id}
        emptyMessage="No expenses recorded yet."
      />
    </div>
  );
}
