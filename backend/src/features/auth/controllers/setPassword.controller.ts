import UserModel from '@/shared/models/user.model';
import { DecodedJwt } from '@/shared/types/DecodedToken.type';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import { RequestHandler } from 'express';
import { SetPassword } from '../schemas/setPassword.schema';

export const setPassword: RequestHandler = async (req, res) => {
  const user = req.user as DecodedJwt;
  const data = req.body as SetPassword;
  try {
    const userExists = await UserModel.findById(user.id).select('+password');

    if (userExists!.password && !userExists!.googleProviderId) {
      AppError(res, 400, 'Password is already set');
      return;
    }

    userExists!.password = data.confirmNewPassword;
    await userExists!.save();

    AppSuccess(res, 200, 'Password set successfully');
  } catch (error) {
    AppError(res);
  }
};
