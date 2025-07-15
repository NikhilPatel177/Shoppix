import type { User } from "./User.type";

export interface ServerRes {
  accessToken: string;
  data: User;
  message: string;
  success: boolean;
  statusCode: boolean;
}
