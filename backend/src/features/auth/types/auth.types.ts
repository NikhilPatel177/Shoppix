import { IUser } from '@/shared/types/IUser.type';

export type AuthUserType = Pick<
  IUser,
  | 'activeRole'
  | 'email'
  | 'isEmailVerified'
  | 'avatar'
  | 'createdAt'
  | 'id'
  | 'fullName'
  | 'phone'
  | 'isPhoneVerified'
  | 'gender'
>;
