import { RequestHandler } from 'express';
import {
  respondErr,
  respondOk,
  respondServerErr,
} from '../../../../shared/utils/sendReponse';
import { UserModel } from '../../../../shared/models/user.model';
import jwt from 'jsonwebtoken';
import { generateTemplate } from '../../../../shared/emails/generateTemplates';
import { env } from '../../../../config/env';
import { sendEmail } from '../../../../shared/utils/sendEmail';

export const forgotPassword: RequestHandler = async (req, res) => {
  if (!req.body || !req.body.email || Object.keys(req.body).length === 0) {
    respondErr(res, 400, 'Email not provided');
    return;
  }

  const email = req.body.email;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      respondErr(res, 404, 'No user found with the email you provided');
      return;
    }

    if (!user.isVerified) {
      respondErr(
        res,
        400,
        'You are not verified from email to go through this process'
      );
      return;
    }

    const token = jwt.sign(
      { id: user.id, purpose: 'RESET_PASSWORD' },
      env.RESET_PASSWORD_TOKEN_SECRET,
      { expiresIn: env.MULTIPURPOSE_TOKEN_EXPIRES_IN } as jwt.SignOptions
    );
    const html = generateTemplate('reset-password', {
      name: user.fullName.firstName,
      resetPassword: `http://localhost:5173/reset-password?token=${token}`,
      year: new Date().getFullYear().toString(),
    });
    console.log(token);

    await sendEmail({
      to: user.email,
      subject: 'Reset your password',
      html,
    });

    respondOk(
      res,
      200,
      "We've sent you a link to reset your password. Please check your email."
    );
  } catch (error) {
    console.log('Forgot password failed : ', error);
    respondServerErr(res);
  }
};
