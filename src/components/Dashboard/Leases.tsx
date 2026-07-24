import { Plus } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { type Column } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFetchList } from '@/hooks/useFetchList';
import type { Lease, LeaseStatus } from '@/types';

const statusVariant: Record<LeaseStatus, 'success' | 'secondary' | 'destructive' | 'warning'> = {
  active: 'success',
  pending: 'warning',
  expired: 'secondary',
  terminated: 'destructive',
};

export default function Leases() {
  const { data, isLoading, error } = useFetchList<Lease>('/leases');

  const columns: Column<Lease>[] = [
    { header: 'Tenant', accessor: (row) => <span className="font-medium">{row.tenant_name ?? `#${row.tenant_id}`}</span> },
    { header: 'Unit', accessor: (row) => row.unit_number ?? `#${row.unit_id}` },
    { header: 'Start', accessor: (row) => new Date(row.start_date).toLocaleDateString() },
    { header: 'End', accessor: (row) => new Date(row.end_date).toLocaleDateString() },
    {
      header: 'Rent',
      accessor: (row) => row.rent_amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' }),
    },
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
        title="Leases"
        description="Active and historical lease agreements."
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New lease
          </Button>
        }
      />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
        rowKey={(row) => row.id}
        emptyMessage="No leases yet."
      />
    </div>
  );
}
