import UserModel from '@/shared/models/user.model';
import { DecodedJwt } from '@/shared/types/DecodedToken.type';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import { RequestHandler } from 'express';
import { sendFormattedData } from '../utils/sendFormattedData';

export const getUser: RequestHandler = async (req, res) => {
  const user = req.user as DecodedJwt;

  try {
    const isUser = await UserModel.findById(user.id);

    if (!isUser) {
      return AppError(res, 404, 'No user found');
    }

    const data = sendFormattedData(isUser);
    AppSuccess(res, 200, 'User fetched successfully', data);
  } catch (error) {
    AppError(res);
  }
};
