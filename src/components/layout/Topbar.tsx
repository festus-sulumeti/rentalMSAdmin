import { LogOut, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 md:px-6">
      <div className="text-sm text-muted-foreground">
        Welcome back{user?.full_name ? `, ${user.full_name}` : ''}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          <UserCircle className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">{user?.full_name ?? 'Admin'}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </header>
  );
}
