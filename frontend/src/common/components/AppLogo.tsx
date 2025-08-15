import appLogo from '@assets/app-logo.svg';
import { cn } from '@common/utils/cn';

export const AppLogo = ({ className }: { className?: string }) => {
  return (
    <img
      src={appLogo}
      alt="Shoppix Logo"
      className={cn('w-auto h-full object-cover', className)}
    />
  );
};
