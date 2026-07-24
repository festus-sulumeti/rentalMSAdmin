import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  DoorOpen,
  FileSignature,
  Wallet,
  Receipt,
  Wrench,
  Bell,
  FileText,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/properties', label: 'Properties', icon: Building2 },
  { to: '/dashboard/units', label: 'Units', icon: DoorOpen },
  { to: '/dashboard/leases', label: 'Leases', icon: FileSignature },
  { to: '/dashboard/payments', label: 'Payments', icon: Wallet },
  { to: '/dashboard/invoices', label: 'Invoices', icon: FileText },
  { to: '/dashboard/expenses', label: 'Expenses', icon: Receipt },
  { to: '/dashboard/maintenance', label: 'Maintenance', icon: Wrench },
  { to: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { to: '/dashboard/users', label: 'Users', icon: Users },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-border bg-card md:flex md:flex-col">
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
          R
        </div>
        <span className="font-semibold tracking-tight">Rental MS</span>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
                isActive && 'bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary'
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-3 text-xs text-muted-foreground">
        Rental MS Admin · v1.0
      </div>
    </aside>
  );
}
