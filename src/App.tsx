import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import AdminLayout from '@/components/layout/AdminLayout';
import Dashboard from './components/Dashboard/Dashboard';
import Properties from './components/Dashboard/Properties';
import Units from './components/Dashboard/Units';
import Leases from './components/Dashboard/Leases';
import Payments from './components/Dashboard/Payments';
import Invoices from './components/Dashboard/Invoices';
import Expenses from './components/Dashboard/Expenses';
import Maintenance from './components/Dashboard/Maintenance';
import Notifications from './components/Dashboard/Notifications';
import Users from './components/Dashboard/Users';



function App() {
  

  return (
   <>
    <Routes>
      <Route path="/" element={<Login />} />
       {/* <Route element={<ProtectedRoute />}> */}
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/properties" element={<Properties />} />
              <Route path="/dashboard/units" element={<Units />} />
              <Route path="/dashboard/leases" element={<Leases />} />
              <Route path="/dashboard/payments" element={<Payments />} />
              <Route path="/dashboard/invoices" element={<Invoices />} />
              <Route path="/dashboard/expenses" element={<Expenses />} />
              <Route path="/dashboard/maintenance" element={<Maintenance />} />
              <Route path="/dashboard/notifications" element={<Notifications />} />
              <Route path="/dashboard/users" element={<Users />} />
            </Route>
    </Routes>
   </>
  )
}

export default App