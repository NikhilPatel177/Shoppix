export interface IUser {
  email: string;
  password: string;

  comparePassword(enteredPassword: string): Promise<boolean>;
}
