import { Response } from 'express';

type CustomResponseOptions<D = undefined, T = undefined, E = undefined> = {
  message?: string;
  data?: D;
  token?: T;
  errors?: E;
};

export const respondCustom = <D = undefined, T = undefined, E = undefined>(
  res: Response,
  statusCode: number,
  options: CustomResponseOptions<D, T, E> = {}
) => {
  const { message, data, token, errors } = options;
  const success = statusCode >= 200 && statusCode < 300;

  return res.status(statusCode).json({
    statusCode,
    success,
    message,
    data,
    token,
    errors,
  });
};

export const respondErr = (
  res: Response,
  statusCode?: number,
  message?: string
) => {
  if (!message || !statusCode) {
    (statusCode = 400), (message = 'Failed');
  }
  return respondCustom(res, statusCode, { message });
};

export const respondOk = (
  res: Response,
  statusCode?: number,
  message?: string
) => {
  if (!message || !statusCode) {
    (statusCode = 200), (message = 'Ok');
  }
  return respondCustom(res, statusCode, { message });
};

export const respondWithData = <D = undefined, T = undefined>(
  res: Response,
  data: D,
  statusCode?: number,
  message?: string,
  token?: T
) => {
  if (!message || !statusCode) {
    (statusCode = 200), (message = 'Ok');
  }
  return respondCustom(res, statusCode, { message, data, token });
};

export const respondWithErrors = <E = undefined>(
  res: Response,
  errors: E,
  statusCode?: number,
  message?: string
) => {
  if (!message || !statusCode) {
    (statusCode = 400), (message = 'Failed');
  }
  return respondCustom(res, statusCode, { message, errors });
};

export const respondServerErr = (res: Response) => {
  return respondCustom(res, 500, {
    message: 'Something went wrong, Please try again later',
  });
};
