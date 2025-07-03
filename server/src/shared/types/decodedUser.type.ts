import { Types } from 'mongoose';

export type DecodedUser = {
  id: Types.ObjectId;
  activeRole: string;
  iat: number;
  exp: number;
};
