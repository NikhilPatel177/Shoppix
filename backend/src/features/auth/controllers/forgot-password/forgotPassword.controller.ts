import { RequestHandler } from 'express';
import { ForgotPassword } from '../../schemas/resetPassword.schema';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import UserModel from '@/shared/models/user.model';
import { generateOtp } from '@/shared/utils/generateOtp';
import OtpModel from '@/shared/models/otp.model';
import { sendEmail } from '@/shared/utils/sendEmails';

export const forgotPassword: RequestHandler = async (req, res) => {
  const data = req.validatedData as ForgotPassword;

  try {
    const userExists = await UserModel.findOne({ email: data.email });

    if (!userExists || !userExists.isEmailVerified) {
      return AppSuccess(
        res,
        200,
        'If your email exists and is verified, an OTP will be sent'
      );
    }

    const otpRecord = await OtpModel.findOne({
      email: data.email,
      purpose: 'forgot_password',
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
      } else if (
        otpRecord.lockedUntil &&
        otpRecord.lockedUntil.getTime() <= Date.now()
      ) {
        await otpRecord.deleteOne();
      } else {
        return AppSuccess(res, 200, `Otp was already sent to your email`);
      }
    }
    const otp = generateOtp();
    await OtpModel.create({
      email: data.email,
      otpCode: otp,
      purpose: 'forgot_password',
    });
    try {
      await sendEmail(
        userExists.email,
        'Forgot password otp code',
        'forgot_password',
        otp
      );
      console.log('Email sent');
    } catch (emailErr) {
      console.error('Failed to send OTP email:', emailErr);
    }

    return AppSuccess(res, 200, 'Otp sent successfully');
  } catch (error) {
    return AppError(res);
  }
};
