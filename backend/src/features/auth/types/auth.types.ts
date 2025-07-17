import { IUser } from '@/shared/models/user.model';

export type AuthUserType = Pick<
  IUser,
  'activeRole' | 'email' | 'isEmailVerified' | 'avatar' | 'createdAt' | 'id' | 'fullName'
>;
