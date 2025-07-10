import { Response } from 'express';

export const AppSuccess = <T = any>(
  res: Response,
  statusCode?: number,
  message?: string,
  data?: T,
  accessToken?: string
) => {
  return res
    .status(statusCode || 200)
    .json({ message: message || 'Success', data, accessToken, success: true });
};

export const AppError = <E = any>(
  res: Response,
  statusCode?: number,
  message?: string,
  errors?: E
) => {
  return res.status(statusCode || 500).json({
    message: message || 'Something went wrong, Please try again later',
    errors,
    success: false,
  });
};
