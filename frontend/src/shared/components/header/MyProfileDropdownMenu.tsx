import {
  CircleUserRound,
  Heart,
  Package,
  Store,
  type LucideIcon,
} from 'lucide-react';
import { useAuthStore } from '../../strore/useAuthStore';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { useState } from 'react';
import { NavItem } from './NavItem';
import clsx from 'clsx';
import { LogoutButton } from '@/features/auth/interactions/LogoutButton';

export const MyProfileDropdownMenu = () => {
  const { user } = useAuthStore();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  return (
    <div className="relative hidden min-[500px]:block">
      <button
        className="duration-200 font-medium text-gray-600 hover:text-gray-800 flex items-center gap-1"
        onClick={() => setOpenDropdown((prev) => !prev)}
      >
        {user?.avatar ? (
          <Avatar className="w-5 h-5">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>Profile Image</AvatarFallback>
          </Avatar>
        ) : (
          <CircleUserRound className="w-5 h-5" />
        )}
        <span>
          {user?.fullName.firstName ? user.fullName.firstName : 'Profile'}
        </span>
      </button>

      {openDropdown && (
        <div
          className="absolute top-8 right-0 w-50 shadow-sm rounded-md p-2 font-[poppins] text-gray-600 flex flex-col gap-1"
          onMouseLeave={() => setOpenDropdown((prev) => !prev)}
        >
          <p className="w-full text-center">My Account</p>
          <hr />
          <ul>
            <MyDropdownItem
              to="/account"
              label="My Profile"
              icon={CircleUserRound}
            />
            <MyDropdownItem to="/wishlist" label="Wishlist" icon={Heart} />
            <MyDropdownItem to="/order" label="Orders" icon={Package} />
            <MyDropdownItem
              to="/order"
              label="My Orders"
              icon={Package}
              className="block min-[500px]:hidden"
            />
            <MyDropdownItem
              to="/seller"
              label="Become a seller"
              icon={Store}
              className="block min-[650px]:hidden"
            />
          </ul>
          <hr />
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export const MyDropdownItem = ({
  to,
  label,
  className,
  icon,
}: {
  to: string;
  label: string;
  className?: string;
  icon: LucideIcon;
}) => {
  return (
    <NavItem
      to={to}
      label={label}
      className={clsx(className, 'hover:bg-emerald-50 hover:rounded-md ')}
      icon={icon}
    />
  );
};
