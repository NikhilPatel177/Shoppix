import { RequestHandler } from 'express';
import { resetPasswordFormData } from '../../validators/password.validator';
import {
  respondErr,
  respondOk,
  respondServerErr,
} from '../../../../shared/utils/sendReponse';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { env } from '../../../../config/env';
import { Types } from 'mongoose';
import { UserModel } from '../../../../shared/models/user.model';

export const resetPassword: RequestHandler = async (req, res) => {
  const data = req.validatedData as resetPasswordFormData;
  const { newPassword, token } = data;

  try {
    const decoded = jwt.verify(token, env.RESET_PASSWORD_TOKEN_SECRET);
    const { id } = decoded as { id: Types.ObjectId; purpose: 'RESET_PASSWORD' };

    const isUser = await UserModel.findById(id).select('+password');

    if (!isUser) {
      respondErr(res, 404, 'Invalid token: user not found');
      return;
    }

    isUser.password = newPassword;
    await isUser.save();

    respondOk(res, 200, 'Your password has been reset successfully');
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      respondErr(res, 400, 'Invalid access token');
    } else if (error instanceof TokenExpiredError) {
      respondErr(res, 400, 'Access token has expired');
    } else {
      respondServerErr(res);
    }
  }
};
