import OtpModel from '@/shared/models/otp.model';
import UserModel from '@/shared/models/user.model';
import { DecodedJwt } from '@/shared/types/DecodedToken.type';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import { RequestHandler } from 'express';
import { ResendEmail } from '../../schemas/resendEmail.schema';
import { generateOtp } from '@/shared/utils/generateOtp';
import { sendEmail } from '@/shared/utils/sendEmails';

export const resendEmailWithOtp: RequestHandler = async (req, res) => {
  const data = req.body as ResendEmail;
  const user = req.user as DecodedJwt;

  try {
    const userExists = await UserModel.findById(user.id);
    if (!userExists) {
      return AppError(res, 404, 'No user found');
    }

    if (userExists.isEmailVerified) {
      return AppError(res, 400, 'Email already verified');
    }

    let otpRecord = await OtpModel.findOne({
      email: data.email,
      purpose: data.purpose,
    });

    if (otpRecord) {
      if (
        otpRecord.lockedUntil &&
        otpRecord.lockedUntil.getTime() > Date.now()
      ) {
        const msLeft = otpRecord.lockedUntil.getTime() - Date.now();
        const minutesLeft = Math.ceil(msLeft / 60000);
        return AppError(
          res,
          429,
          `Too many requests. Try again after ${minutesLeft} minute(s).`
        );
      }

      const otp = generateOtp();
      otpRecord.otpCode = otp;
      otpRecord.lockedUntil = undefined;
      await otpRecord.save();

      await sendEmail(
        otpRecord.email,
        data.purpose === 'verify_email'
          ? 'Email verification OTP code'
          : 'Forgot password OTP code',
        data.purpose,
        otp
      );

      AppSuccess(res, 200, 'OTP resent successfully');
    }

    const otp = generateOtp();
    await OtpModel.create({
      email: data.email,
      otpCode: otp,
      purpose: data.purpose,
    });

    await sendEmail(
      data.email,
      data.purpose === 'verify_email'
        ? 'Email verification OTP code'
        : 'Forgot password OTP code',
      data.purpose,
      otp
    );

    return AppSuccess(res, 200, 'OTP sent successfully');
  } catch (error) {
    console.error(error);
    AppError(res);
  }
};
