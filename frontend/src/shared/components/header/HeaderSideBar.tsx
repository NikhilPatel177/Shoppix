import { Avatar } from '@/shared/components/ui/avatar';
import {
  CircleUserRound,
  Heart,
  MenuIcon,
  Package,
  ShoppingCart,
  Store,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../strore/useAuthStore';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { NavLink } from 'react-router-dom';
import { LogoutButton } from '@/features/auth/interactions/LogoutButton';
import { Link } from 'react-router-dom';

export const HeaderSideBar = () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const { user } = useAuthStore();

  const sidebarNavItems = [
    { to: '/account/cart', icon: ShoppingCart, label: 'My Cart' },
    { to: '/account/orders', icon: Package, label: 'My Orders' },
    { to: '/account/wishlist', icon: Heart, label: 'Wishlist' },
    { to: '/account/seller', icon: Store, label: 'Become a seller' },
  ];

  return (
    <div>
      <button onClick={() => setShowSideBar((prev) => !prev)}>
        <MenuIcon />
      </button>

      {showSideBar && (
        <div
          className="absolute inset-y-0 right-0 z-50 w-full bg-[rgba(0,0,0,0.5)]"
          onClick={() => setShowSideBar(false)}
        >
          <div
            className="space-y-2 ml-auto w-[65%] h-full bg-white text-gray-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header Section */}
            <Link
              to={'/account/profile'}
              className="flex items-center gap-2 bg-primary p-3 overflow-x-hidden"
              onClick={() => setShowSideBar(false)}
            >
              {user?.avatar ? (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>Profile Image</AvatarFallback>
                </Avatar>
              ) : (
                <CircleUserRound className="min-w-8 min-h-8" color="white" />
              )}
              <p className="text-lg font-medium text-white">
                {user?.fullName.firstName
                  ? `${user.fullName.firstName} ${user.fullName.lastName}`
                  : 'Account'}
              </p>
            </Link>

            {/* Scrollable List */}
            <ul className="flex-1 overflow-y-auto p-2">
              {sidebarNavItems.map((item) => (
                <SidebarItems
                  key={item.to}
                  {...item}
                  onNavigate={() => setShowSideBar(false)}
                />
              ))}
              <hr />
              <LogoutButton className="px-3" />
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export const SidebarItems = ({
  icon: Icon,
  label,
  to,
  onNavigate,
}: {
  icon: LucideIcon;
  label: string;
  to: string;
  onNavigate: () => void;
}) => {
  return (
    <li className="p-2 hover:bg-emerald-50 hover:rounded-md font-medium">
      <NavLink
        to={to}
        className={'flex items-center gap-3'}
        onClick={onNavigate}
      >
        {Icon && <Icon className="w-5 h-5" color="gray" />}
        {label}
      </NavLink>
    </li>
  );
};
