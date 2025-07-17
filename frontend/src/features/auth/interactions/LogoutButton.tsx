import { cn } from '@/shared/lib/utils';
import { LogOut } from 'lucide-react';
import { useLogoutMutation } from '../hooks/useLogoutMutation';

type LogoutButtonProps = {
  className?: string;
};

export const LogoutButton = ({ className }: LogoutButtonProps) => {
  const { mutate } = useLogoutMutation();
  function handleLogout() {
    mutate();
  }

  return (
    <button
      className={cn(
        'text-red-600 text-start px-4 py-2 flex items-center gap-1 hover:bg-emerald-50 ',
        className
      )}
      onClick={handleLogout}
    >
      <LogOut className="w-5 h-5" />
      <span>Logout</span>
    </button>
  );
};
