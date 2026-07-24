import { Plus } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { type Column } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFetchList } from '@/hooks/useFetchList';
import type { User } from '@/types';

export default function Users() {
  const { data, isLoading, error } = useFetchList<User>('/users');

  const columns: Column<User>[] = [
    { header: 'Name', accessor: (row) => <span className="font-medium">{row.full_name}</span> },
    { header: 'Email', accessor: (row) => row.email },
    { header: 'Role', accessor: (row) => <span className="capitalize">{row.role}</span> },
    { header: 'Phone', accessor: (row) => row.phone ?? '—' },
    {
      header: 'Status',
      accessor: (row) => (
        <Badge variant={row.is_active ? 'success' : 'secondary'}>
          {row.is_active ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    { header: 'Joined', accessor: (row) => new Date(row.created_at).toLocaleDateString() },
  ];

  return (
    <div>
      <PageHeader
        title="Users"
        description="Admins, managers, and tenants with platform access."
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Invite user
          </Button>
        }
      />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
        rowKey={(row) => row.id}
        emptyMessage="No users yet."
      />
    </div>
  );
}
