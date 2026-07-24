import { Plus } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { type Column } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { useFetchList } from '@/hooks/useFetchList';
import type { Property } from '@/types';

export default function Properties() {
  const { data, isLoading, error } = useFetchList<Property>('/properties');

  const columns: Column<Property>[] = [
    { header: 'Name', accessor: (row) => <span className="font-medium">{row.name}</span> },
    { header: 'Address', accessor: (row) => row.address },
    { header: 'City', accessor: (row) => row.city },
    { header: 'Units', accessor: (row) => row.unit_count },
    { header: 'Owner', accessor: (row) => row.owner_name ?? '—' },
  ];

  return (
    <div>
      <PageHeader
        title="Properties"
        description="All properties managed on the platform."
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add property
          </Button>
        }
      />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
        rowKey={(row) => row.id}
        emptyMessage="No properties yet. Add your first property to get started."
      />
    </div>
  );
}
