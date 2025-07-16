export type User = {
  activeRole: 'buyer' | 'seller' | 'admin';
  email: string;
  isEmailVerified: boolean;
  avatar: string;
  createdAt: Date;
  id: string;
  resetToken: string;
};
