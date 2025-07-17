import { cn } from '@/shared/lib/utils';
import { LogOut } from 'lucide-react';

type LogoutButtonProps = {
  className?: string;
};

export const LogoutButton = ({ className }: LogoutButtonProps) => {
  return (
    <div
      className={cn(
        'text-red-600 text-start px-4 py-2 flex items-center gap-1 hover:bg-emerald-50 ',
        className
      )}
    >
      <LogOut className="w-5 h-5" />
      <button>Logout</button>
    </div>
  );
};
