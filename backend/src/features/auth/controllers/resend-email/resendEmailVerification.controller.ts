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
    const userExists = await UserModel.findOne({ email: data.email });
    if (!userExists) {
      return AppError(res, 404, 'No user found');
    }

    let otpRecord = await OtpModel.findOne({
      email: data.email,
      purpose: data.purpose,
    });

    if (!otpRecord) {
      return AppError(res, 400, 'No otp was requested with this email');
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
  } catch (error) {
    console.error(error);
    AppError(res);
  }
};
