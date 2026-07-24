import { Plus } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { type Column } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFetchList } from '@/hooks/useFetchList';
import type { Unit, UnitStatus } from '@/types';

const statusVariant: Record<UnitStatus, 'success' | 'warning' | 'secondary'> = {
  occupied: 'success',
  vacant: 'warning',
  maintenance: 'secondary',
};

export default function Units() {
  const { data, isLoading, error } = useFetchList<Unit>('/units');

  const columns: Column<Unit>[] = [
    { header: 'Unit #', accessor: (row) => <span className="font-medium">{row.unit_number}</span> },
    { header: 'Property', accessor: (row) => row.property_name ?? `#${row.property_id}` },
    { header: 'Beds / Baths', accessor: (row) => `${row.bedrooms} bd · ${row.bathrooms} ba` },
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
        title="Units"
        description="Every unit across all properties, with occupancy status."
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add unit
          </Button>
        }
      />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        error={error}
        rowKey={(row) => row.id}
        emptyMessage="No units yet."
      />
    </div>
  );
}
