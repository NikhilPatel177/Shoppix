import { CircleUserRound, Heart, ShoppingCart, Store } from 'lucide-react';
import { MySearchBar } from '../components/MySearchBar';
import { NavItem } from '../components/header/NavItem';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../strore/useAuthStore';
import { MyProfileDropdownMenu } from '../components/header/MyProfileDropdownMenu';
import { HeaderSideBar } from '../components/header/HeaderSideBar';

export const Header = () => {
  const { user } = useAuthStore();

  return (
    <>
      <header className="font-[poppins] w-full">
        <div className="h-14 max-w-7xl mx-auto px-4 flex gap-4 items-center justify-between">
          <section className="flex items-center h-full">
            <NavLink to={'/'}>
              <img
                src="/images/logo/shoppix-logo.png"
                alt="Shoppix logo"
                className="h-10 w-auto"
              />
            </NavLink>
          </section>

          <section className="flex-1 max-w-170 hidden min-[1050px]:block">
            <MySearchBar />
          </section>

          <nav className="hidden min-[500px]:block">
            <ul className="flex items-center gap-4">
              <NavItem
                to="/seller"
                label="Become a seller"
                icon={Store}
                className="hidden min-[800px]:block"
              />
              <NavItem
                to="/wishlist"
                label="Wishlist"
                icon={Heart}
                className="hidden min-[650px]:block"
              />
              <NavItem to="/cart" label="Cart" icon={ShoppingCart} />
              {!user ? (
                <NavItem to="/auth" label="Register" icon={CircleUserRound} />
              ) : (
                <MyProfileDropdownMenu />
              )}
            </ul>
          </nav>

          <nav className="block min-[500px]:hidden">
            <HeaderSideBar />
          </nav>
        </div>
      </header>
    </>
  );
};
