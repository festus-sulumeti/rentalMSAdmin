export type Role = 'admin' | 'manager' | 'tenant';

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: Role;
  phone?: string;
  is_active: boolean;
  created_at: string;
}

export interface Property {
  id: number;
  name: string;
  address: string;
  city: string;
  unit_count: number;
  owner_name?: string;
  created_at: string;
}

export type UnitStatus = 'occupied' | 'vacant' | 'maintenance';

export interface Unit {
  id: number;
  property_id: number;
  property_name?: string;
  unit_number: string;
  bedrooms: number;
  bathrooms: number;
  rent_amount: number;
  status: UnitStatus;
}

export type LeaseStatus = 'active' | 'expired' | 'terminated' | 'pending';

export interface Lease {
  id: number;
  unit_id: number;
  unit_number?: string;
  tenant_id: number;
  tenant_name?: string;
  start_date: string;
  end_date: string;
  rent_amount: number;
  deposit_amount: number;
  status: LeaseStatus;
}

export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'overdue';

export interface Payment {
  id: number;
  lease_id: number;
  tenant_name?: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  paid_at?: string;
  due_date: string;
}

export interface Expense {
  id: number;
  property_id: number;
  property_name?: string;
  category: string;
  description: string;
  amount: number;
  incurred_at: string;
}

export type MaintenanceStatus = 'open' | 'in_progress' | 'resolved' | 'cancelled';
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent';

export interface MaintenanceRequest {
  id: number;
  unit_id: number;
  unit_number?: string;
  tenant_name?: string;
  title: string;
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  created_at: string;
}

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'void';

export interface Invoice {
  id: number;
  lease_id: number;
  tenant_name?: string;
  invoice_number: string;
  amount: number;
  status: InvoiceStatus;
  issued_at: string;
  due_date: string;
}

export interface DashboardStats {
  total_properties: number;
  total_units: number;
  occupied_units: number;
  vacant_units: number;
  active_leases: number;
  monthly_revenue: number;
  pending_payments: number;
  open_maintenance_requests: number;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiListResponse<T> {
  data: T[];
  total?: number;
}
