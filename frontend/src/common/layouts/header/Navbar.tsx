import { ShoppingCart, Store } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div>
      <ul className="flex items-center gap-3 font-semibold text-muted-foreground">
        <li className="hidden lg:block">
          <NavLink to={'/auth'} className={'p-2 rounded hover:text-primary flex items-center gap-1'}>
          <Store className='w-5 h-5'/>
             Become a seller
          </NavLink>
        </li>
       
        <li className="hidden 2md:block">
          <NavLink to={'/auth'} className={'p-2 rounded hover:text-primary flex items-center gap-1'}>
          <ShoppingCart className='w-5 h-5'/>
             Cart
          </NavLink>
        </li>

        <li className="hidden md:block">
          <NavLink to={'/auth'} className={'p-2 rounded hover:text-primary'}>
            Login
          </NavLink>
        </li>

        <li>
          <NavLink
            to={'/auth'}
            className={
              'p-2 rounded md:border border-border md:hover:text-white md:hover:bg-primary md:hover:border-primary'
            }
          >
            Register
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
