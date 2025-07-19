import { Types } from 'mongoose';
import { UserRoles } from '../types/IUser.type';

export type DecodedJwt = {
  id: Types.ObjectId;
  activeRole: UserRoles;
  iat?: number;
  exp?: number;
};
