import { Types } from 'mongoose';
import { IUser } from '../../../shared/models/user.model';

export type User = Pick<
  IUser,
  | 'fullName'
  | 'email'
  | 'createdAt'
  | 'isVerified'
  | 'profileImg'
  | 'activeRole'
  | 'id'
>;
