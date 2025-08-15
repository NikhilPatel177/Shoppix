import { AppLogo } from '@common/components/AppLogo';
import { Sidebar } from './Sidebar';

export const Header = () => {
  return (
    <header>
      <div className="h-12 py-2 flex items-center justify-between sm:h-14">
        <Sidebar/>
        <AppLogo />
      
      </div>
    </header>
  );
};
