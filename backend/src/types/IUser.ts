export interface IUser {
  email: string;
  phone: string;
  password: string;

  comparePassword(enteredPassword: string): Promise<boolean>;
}
