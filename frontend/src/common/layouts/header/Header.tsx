import { AppLogo } from '@common/components/AppLogo';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { SearchForm } from './SearchForm';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  const showMobileSearchForm = location.pathname === '/';
  return (
    <header>
      <div className="h-12 py-2 max-w-320 mx-auto flex flex-wrap items-center justify-between gap-4 sm:h-14">
        <div className="md:hidden">
          <Sidebar />
        </div>

        <AppLogo />

        <div className="flex-1 hidden sm:block">
          <SearchForm />
        </div>

        <Navbar />
      </div>

      {showMobileSearchForm && (
        <div className="sm:hidden">
          <SearchForm />
        </div>
      )}
    </header>
  );
};
