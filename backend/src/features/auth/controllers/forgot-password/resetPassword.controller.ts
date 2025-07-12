import { RequestHandler } from 'express';
import { ResetPassword } from '../../schemas/resetPassword.schema';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import jwt from 'jsonwebtoken';
import UserModel from '@/shared/models/user.model';
import env from '@/config/env';

export const resetPassword: RequestHandler = async (req, res) => {
  const data = req.validatedData as ResetPassword;

  try {
    const decodedToken = jwt.verify(
      data.resetToken,
      env.RESET_PASSWORD_SECRET
    ) as { email: string };
    const userExists = await UserModel.findOne({
      email: decodedToken.email,
    }).select('+password');

    if (!userExists || userExists.passwordResetToken !== data.resetToken) {
      return AppError(res, 404, 'Token Malformed');
    }

    userExists.password = data.confirmNewPassword;
    userExists.passwordResetToken = undefined;
    await userExists.save();

    return AppSuccess(res, 200, 'Password has been reset successfully');
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return AppError(res, 400, 'Reset token expired');
    } else if (error.name === 'JsonWebTokenError') {
      return AppError(res, 400, 'Invalid reset token');
    } else {
      return AppError(res);
    }
  }
};
