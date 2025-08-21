export interface IUser {
  email: string;
  phone: string;
  password: string;

  refreshToken: string | null;

  comparePassword(enteredPassword: string): Promise<boolean>;
}
