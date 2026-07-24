import PageHeader from '@/components/shared/PageHeader';
import DataTable, { type Column } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { useFetchList } from '@/hooks/useFetchList';
import type { Payment, PaymentStatus } from '@/types';

const statusVariant: Record<PaymentStatus, 'success' | 'warning' | 'destructive' | 'secondary'> = {
  paid: 'success',
  pending: 'warning',
  overdue: 'destructive',
  failed: 'destructive',
};

export default function Payments() {
  const { data, isLoading, error } = useFetchList<Payment>('/payments');

  const columns: Column<Payment>[] = [
    { header: 'Tenant', accessor: (row) => row.tenant_name ?? `Lease #${row.lease_id}` },
    {
      header: 'Amount',
      accessor: (row) => row.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' }),
    },
    { header: 'Method', accessor: (row) => <span className="capitalize">{row.method}</span> },
    { header: 'Due date', accessor: (row) => new Date(row.due_date).toLocaleDateString() },
    { header: 'Paid on', accessor: (row) => (row.paid_at ? new Date(row.paid_at).toLocaleDateString() : '—') },
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
        title="Payments"
        description="Rent payments across all active leases."
      />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
        rowKey={(row) => row.id}
        emptyMessage="No payments recorded yet."
      />
    </div>
  );
}
