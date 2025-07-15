import { CircleUserRound, Heart, ShoppingCart, Store } from 'lucide-react';
import { MySearchBar } from '../components/MySearchBar';
import { NavLink, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  return (
    <>
      <header className="font-[poppins] px-3 py-2 h-12 min-[500px]:px-5 sm:h-15">
        <div className="flex w-full h-full items-center justify-between">
          <div className="w-30 h-full">
            <img
              src="/images/logo/shoppix-logo.png"
              alt="Shoppix logo"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-[50%] hidden min-[700px]:block">
            <MySearchBar />
          </div>
          <ul className="flex gap-6 items-center">
            <li className="hidden xl:block">
              <NavLink
                to={'/become-seller'}
                className="flex items-center gap-2"
              >
                <Store strokeWidth={1.5} size={25} />
                <span>Become a seller</span>
              </NavLink>
            </li>
            <li className="hidden min-[900px]:block">
              <NavLink to={'/wishlist'} className="flex items-center gap-2">
                <Heart strokeWidth={1.5} size={25} fill="red" stroke="red" />
                <span>Wishlist</span>
              </NavLink>
            </li>

            <li className="">
              <NavLink to={'/cart'} className="flex items-center gap-2">
                <ShoppingCart strokeWidth={1.5} size={25} />
                <span>Cart</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/auth?mode=register&from=${location.pathname}`}
                className="flex items-center gap-2"
              >
                <CircleUserRound strokeWidth={1.5} size={25} />
                <span>Login</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};
