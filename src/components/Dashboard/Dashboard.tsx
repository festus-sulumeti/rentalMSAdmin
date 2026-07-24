import { useEffect, useState } from 'react';
import {
  Building2,
  DoorOpen,
  FileSignature,
  Wallet,
  Clock,
  Wrench,
} from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import StatCard from '@/components/shared/StatCard';
import { api, getErrorMessage } from '@/lib/api';
import type { DashboardStats } from '@/types';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api
      .get<DashboardStats>('/dashboard')
      .then((res) => {
        if (isMounted) setStats(res);
      })
      .catch((err) => {
        if (isMounted) setError(getErrorMessage(err, 'Failed to load dashboard stats'));
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const currency = (value?: number) =>
    typeof value === 'number'
      ? value.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
      : '—';

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Snapshot of properties, occupancy, and revenue across the portfolio."
      />

      {error && (
        <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Properties"
          value={isLoading ? '—' : stats?.total_properties ?? 0}
          icon={Building2}
        />
        <StatCard
          label="Units"
          value={isLoading ? '—' : stats?.total_units ?? 0}
          icon={DoorOpen}
          hint={
            !isLoading && stats
              ? `${stats.occupied_units} occupied · ${stats.vacant_units} vacant`
              : undefined
          }
        />
        <StatCard
          label="Active leases"
          value={isLoading ? '—' : stats?.active_leases ?? 0}
          icon={FileSignature}
        />
        <StatCard
          label="Monthly revenue"
          value={isLoading ? '—' : currency(stats?.monthly_revenue)}
          icon={Wallet}
        />
        <StatCard
          label="Pending payments"
          value={isLoading ? '—' : stats?.pending_payments ?? 0}
          icon={Clock}
        />
        <StatCard
          label="Open maintenance requests"
          value={isLoading ? '—' : stats?.open_maintenance_requests ?? 0}
          icon={Wrench}
        />
      </div>
    </div>
  );
}
