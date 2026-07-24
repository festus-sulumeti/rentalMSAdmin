import PageHeader from '@/components/shared/PageHeader';
import DataTable, { type Column } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { useFetchList } from '@/hooks/useFetchList';
import type { Notification } from '@/types';

export default function Notifications() {
  const { data, isLoading, error } = useFetchList<Notification>('/notifications');

  const columns: Column<Notification>[] = [
    { header: 'Title', accessor: (row) => <span className="font-medium">{row.title}</span> },
    { header: 'Message', accessor: (row) => <span className="text-muted-foreground">{row.message}</span> },
    {
      header: 'Status',
      accessor: (row) => (
        <Badge variant={row.is_read ? 'secondary' : 'warning'}>
          {row.is_read ? 'Read' : 'Unread'}
        </Badge>
      ),
    },
    { header: 'Sent', accessor: (row) => new Date(row.created_at).toLocaleString() },
  ];

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="System notifications sent to users."
      />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
        rowKey={(row) => row.id}
        emptyMessage="No notifications yet."
      />
    </div>
  );
}
