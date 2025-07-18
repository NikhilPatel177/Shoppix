import { IAddress } from './IAddress.type';

export type UserRoles = 'buyer' | 'seller' | 'admin';
export type providers = 'google' | 'credentials';
export interface IUser {
  id: string;
  fullName: { firstName: string; lastName: string };
  phone: string;
  email: string;
  password?: string;
  roles: UserRoles[];
  activeRole: UserRoles;
  provider: providers[];
  googleProviderId?: string;
  avatar?: string;
  refreshToken: string;
  passwordResetToken: string | undefined;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  addresses: IAddress[];

  createdAt: Date;
  updatedAt: Date;

  comparePassword(enteredPassword: string): Promise<boolean>;
}
