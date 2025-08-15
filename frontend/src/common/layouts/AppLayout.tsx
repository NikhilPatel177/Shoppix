import { Outlet } from 'react-router-dom';
import { Header } from './header';
import { Footer } from './footer';

export const AppLayout = () => {
  return (
    <div className="px-2 sm:px-4 md:px-6">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
