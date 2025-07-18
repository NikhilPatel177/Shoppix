import { IUser } from '@/shared/types/IUser.type';
import { AuthUserType } from '../types/auth.types';

export const sendFormattedData = (user: IUser): AuthUserType => {
  return {
    id: user.id,
    email: user.email,
    avatar: user.avatar,
    activeRole: user.activeRole,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
    fullName: {
      firstName: user.fullName.firstName,
      lastName: user.fullName.lastName,
    },
    isPhoneVerified:user.isPhoneVerified,
    phone:user.phone,
    gender:user.gender,
  };
};
