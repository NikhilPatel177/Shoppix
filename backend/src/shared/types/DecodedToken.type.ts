import { Types } from 'mongoose';
import { UserRoles } from '../models/user.model';

export type DecodedJwt = {
  id: Types.ObjectId;
  activeRole: UserRoles;
  iat?: number;
  exp?: number;
};
