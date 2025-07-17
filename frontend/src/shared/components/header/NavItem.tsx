import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

type NavItemProps = {
  to: string;
  label: string;
  icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
};

export const NavItem = ({ to, label, icon: Icon ,className,children}: NavItemProps) => {
  return (
    <li className={clsx("font-medium",className)}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          clsx(
            isActive
              ? 'text-primary font-semibold'
              : 'text-gray-600 hover:text-gray-800',
            'px-3 py-2 rounded-md duration-200 flex gap-1 items-center' 
          )
        }
      >
        {children}
        {Icon && <Icon className="w-5 h-5" color='gray' />}
        {label}
      </NavLink>
    </li>
  );
};
