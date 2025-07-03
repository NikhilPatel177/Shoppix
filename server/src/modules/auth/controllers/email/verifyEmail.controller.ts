import { RequestHandler } from 'express';
import {
  respondErr,
  respondOk,
  respondServerErr,
} from '../../../../shared/utils/sendReponse';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { env } from '../../../../config/env';
import { Types } from 'mongoose';
import { UserModel } from '../../../../shared/models/user.model';

export const verifyEmail: RequestHandler = async (req, res) => {
  if (!req.params.token) {
    respondErr(res, 400, 'Token not provided');
    return;
  }
  const token = req.params?.token;

  try {
    const decoded = jwt.verify(token, env.EMAIL_TOKEN_SECRET);
    const { id } = decoded as { id: Types.ObjectId; purpose: 'Email_Verify' };

    const isUser = await UserModel.findById(id);

    if (!isUser) {
      respondErr(res, 404, 'Invalid token: user not found');
      return;
    }
    if (isUser.isVerified === true) {
      respondErr(res, 400, 'You are already verified');
      return;
    }

    isUser.isVerified = true;
    isUser.verifiedAt = new Date();
    await isUser.save();

    respondOk(res, 200, 'Email verified successfully');
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
