import env from '@/config/env';
import OtpModel from '@/shared/models/otp.model';
import UserModel from '@/shared/models/user.model';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const passwordOtpVerify: RequestHandler = async (req, res) => {
  const data = req.body as { email: string; otpCode: string };

  if (!data || !data.email || !data.otpCode) {
    return AppError(res, 400, 'Please provide email and otpCode');
  }

  try {
    const userExists = await UserModel.findOne({ email: data.email });

    if (!userExists) {
      AppError(res, 404, 'No user found');
      return;
    }

    const otpRecord = await OtpModel.findOne({
      email: data.email,
      purpose: 'forgot_password',
    });

    if (!otpRecord) {
      AppError(res, 400, 'No otp was requested with this email');
      return;
    }

    if (otpRecord.lockedUntil && otpRecord.lockedUntil.getTime() > Date.now()) {
      const msLeft = otpRecord.lockedUntil.getTime() - Date.now();
      const minutesLeft = Math.ceil(msLeft / 60000);
      return AppError(
        res,
        429,
        `Too many requests, Please try again after ${minutesLeft} minute(s) `
      );
    }

    const isOtpCorrect = await otpRecord.compareOtp(data.otpCode);
    if (!isOtpCorrect) {
      if (otpRecord.attempts >= 2) {
        otpRecord.lockedUntil = new Date(Date.now() + 30 * 60 * 1000);
      } else {
        otpRecord.attempts += 1;
      }
      await otpRecord.save();
      return AppError(res, 400, 'Invalid Otp');
    }

    const resetToken = jwt.sign(
      { email: data.email, purpose: 'forgot_password' },
      env.RESET_PASSWORD_SECRET,
      { expiresIn: env.RESET_PASSWORD_EXPIRY } as jwt.SignOptions
    );

    userExists.passwordResetToken = resetToken;
    await userExists.save();
    await otpRecord.deleteOne();

    return AppSuccess(
      res,
      200,
      'Otp verified successfully, Now you can reset your password',
      { resetToken }
    );
  } catch (error) {
    return AppError(res);
  }
};
