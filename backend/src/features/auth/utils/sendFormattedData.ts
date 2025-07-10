import { IUser } from '@/shared/models/user.model';
import { AuthUserType } from '../types/auth.types';

export const sendFormattedData = (user: IUser): AuthUserType => {
  return {
    id: user.id,
    email: user.email,
    avatar: user.avatar,
    activeRole: user.activeRole,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
  };
};
