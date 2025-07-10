import UserModel from '@/shared/models/user.model';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import { RequestHandler } from 'express';
import { ChangePassword } from '../schemas/changePassword.schema';

export const changePassword: RequestHandler = async (req, res) => {
  const user = req.user;
  const data = req.validatedData as ChangePassword;
  try {
    const userExists = await UserModel.findById(user.id).select('+password');

    const isPasswordCorrect = await userExists!.comparePassword(
      data.currentPassword
    );
    if (!isPasswordCorrect) {
      AppError(res, 400, 'Invalid current password');
      return;
    }

    userExists!.password = data.confirmNewPassword;
    await userExists!.save();

    AppSuccess(res, 200, 'Password changed successfully');
  } catch (error) {
    AppError(res);
  }
};
