import PageHeader from '@/components/shared/PageHeader';
import DataTable, { type Column } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { useFetchList } from '@/hooks/useFetchList';
import type { MaintenanceRequest, MaintenanceStatus, MaintenancePriority } from '@/types';

const statusVariant: Record<MaintenanceStatus, 'warning' | 'secondary' | 'success' | 'destructive'> = {
  open: 'warning',
  in_progress: 'secondary',
  resolved: 'success',
  cancelled: 'destructive',
};

const priorityVariant: Record<MaintenancePriority, 'secondary' | 'warning' | 'destructive'> = {
  low: 'secondary',
  medium: 'secondary',
  high: 'warning',
  urgent: 'destructive',
};

export default function Maintenance() {
  const { data, isLoading, error } = useFetchList<MaintenanceRequest>('/maintenance');

  const columns: Column<MaintenanceRequest>[] = [
    { header: 'Title', accessor: (row) => <span className="font-medium">{row.title}</span> },
    { header: 'Unit', accessor: (row) => row.unit_number ?? `#${row.unit_id}` },
    { header: 'Requested by', accessor: (row) => row.tenant_name ?? '—' },
    {
      header: 'Priority',
      accessor: (row) => (
        <Badge variant={priorityVariant[row.priority]} className="capitalize">
          {row.priority}
        </Badge>
      ),
    },
    {
      header: 'Status',
      accessor: (row) => (
        <Badge variant={statusVariant[row.status]} className="capitalize">
          {row.status.replace('_', ' ')}
        </Badge>
      ),
    },
    { header: 'Submitted', accessor: (row) => new Date(row.created_at).toLocaleDateString() },
  ];

  return (
    <div>
      <PageHeader
        title="Maintenance"
        description="Repair and maintenance requests submitted by tenants."
      />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
        rowKey={(row) => row.id}
        emptyMessage="No maintenance requests yet."
      />
    </div>
  );
}
