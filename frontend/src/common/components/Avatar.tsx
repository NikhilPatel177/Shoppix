import userProfile from '@assets/user-profile.jpg';
import { cn } from '@common/utils/cn';

export const Avatar = ({ className }: { className?: string }) => {
  return (
    <img
      src={userProfile}
      alt="User profile"
      className={cn('w-8 h-8 rounded-full object-cover', className)}
    />
  );
};
