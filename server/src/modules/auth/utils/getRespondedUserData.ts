import { IUser } from '../../../shared/models/user.model';
import { User } from '../types/auth.types';

export const getRespondedUserData = (user: IUser): User => {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    activeRole: user.activeRole,
    isVerified: user.isVerified,
    profileImg: user.profileImg,
    createdAt: user.createdAt,
  };
};
