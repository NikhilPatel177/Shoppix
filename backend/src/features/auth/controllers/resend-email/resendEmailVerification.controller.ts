import OtpModel from '@/shared/models/otp.model';
import UserModel from '@/shared/models/user.model';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import { RequestHandler } from 'express';
import { ResendEmail } from '../../schemas/resendEmail.schema';
import { generateOtp } from '@/shared/utils/generateOtp';
import { sendEmail } from '@/shared/utils/sendEmails';

export const resendEmailWithOtp: RequestHandler = async (req, res) => {
  const data = req.body as ResendEmail;

  try {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      return AppError(res, 404, 'No user found');
    }

    if (data.purpose === 'verify_email') {
      if (user.isEmailVerified) {
        return AppError(res, 400, 'Your email is already verified');
      }
    }

    const otpRecord = await OtpModel.findOne({
      email: data.email,
      purpose: data.purpose,
    });

    if (!otpRecord) {
      if (data.purpose === 'forgot_password') {
        return AppError(res, 400, 'No OTP was requested with this email');
      }

      const newOtp = generateOtp();
      await OtpModel.create({
        email: data.email,
        purpose: data.purpose,
        otpCode: newOtp,
      });

      await sendEmail(
        data.email,
        'Email verification OTP code',
        data.purpose,
        newOtp
      );

      return AppSuccess(res, 200, 'OTP resent successfully');
    }

    if (otpRecord.lockedUntil && otpRecord.lockedUntil.getTime() > Date.now()) {
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
    otpRecord.attempts = 0;
    await otpRecord.save();

    await sendEmail(
      data.email,
      data.purpose === 'verify_email'
        ? 'Email verification OTP code'
        : 'Forgot password OTP code',
      data.purpose,
      otp
    );

    return AppSuccess(res, 200, 'OTP resent successfully');
  } catch (error) {
    console.error('Resend OTP Error:', error);
    return AppError(res);
  }
};
