import { Plus } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { type Column } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFetchList } from '@/hooks/useFetchList';
import type { Invoice, InvoiceStatus } from '@/types';

const statusVariant: Record<InvoiceStatus, 'success' | 'secondary' | 'warning' | 'destructive'> = {
  paid: 'success',
  sent: 'warning',
  draft: 'secondary',
  void: 'destructive',
};

export default function Invoices() {
  const { data, isLoading, error } = useFetchList<Invoice>('/invoices');

  const columns: Column<Invoice>[] = [
    { header: 'Invoice #', accessor: (row) => <span className="font-medium">{row.invoice_number}</span> },
    { header: 'Tenant', accessor: (row) => row.tenant_name ?? `Lease #${row.lease_id}` },
    {
      header: 'Amount',
      accessor: (row) => row.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' }),
    },
    { header: 'Issued', accessor: (row) => new Date(row.issued_at).toLocaleDateString() },
    { header: 'Due', accessor: (row) => new Date(row.due_date).toLocaleDateString() },
    {
      header: 'Status',
      accessor: (row) => (
        <Badge variant={statusVariant[row.status]} className="capitalize">
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Invoices"
        description="Issued invoices and their payment status."
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New invoice
          </Button>
        }
      />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
        rowKey={(row) => row.id}
        emptyMessage="No invoices yet."
      />
    </div>
  );
}
