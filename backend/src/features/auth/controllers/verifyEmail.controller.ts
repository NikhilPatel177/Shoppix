import OtpModel from '@/shared/models/otp.model';
import UserModel from '@/shared/models/user.model';
import { DecodedJwt } from '@/shared/types/DecodedToken.type';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import { RequestHandler } from 'express';

export const verifyEmail: RequestHandler = async (req, res) => {
  const data = req.body as { otpCode: string; email: string };
  const user = req.user as DecodedJwt;
  try {
    const userExists = await UserModel.findById(user.id);

    if (!userExists) {
      AppError(res, 404, 'No user found');
      return;
    }

    if (userExists.isEmailVerified) {
      return AppError(res, 400, 'Your email is already verified');
    }

    const otpRecord = await OtpModel.findOne({
      email: data.email,
      purpose: 'verify_email',
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
      AppError(res, 400, 'Invalid Otp');
      return;
    }

    userExists.isEmailVerified = true;
    await userExists.save();
    await otpRecord.deleteOne();

    AppSuccess(res, 200, 'Email verified successfully');
  } catch (error) {
    AppError(res);
  }
};
