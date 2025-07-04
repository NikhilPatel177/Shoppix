import { RequestHandler } from 'express';
import { DecodedUser } from '../../../../shared/types/decodedUser.type';
import {
  respondErr,
  respondOk,
  respondServerErr,
} from '../../../../shared/utils/sendReponse';
import { UserModel } from '../../../../shared/models/user.model';
import jwt from 'jsonwebtoken';
import { env } from '../../../../config/env';
import { generateTemplate } from '../../../../shared/emails/generateTemplates';
import { sendEmail } from '../../../../shared/utils/sendEmail';

export const resendForEmailVerification: RequestHandler = async (req, res) => {
  const { id } = req.user as DecodedUser;
  if (!req.body || !req.body.email) {
    respondErr(res, 400, 'Email not provided');
    return;
  }

  const email = req.body.email;
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      respondErr(res, 404, 'User not found');
      return;
    }
    if (email !== user?.email) {
      respondErr(res, 400, 'Invalid email');
      return;
    }

    const token = jwt.sign(
      { id: user.id, purpose: 'Email_Verify' },
      env.EMAIL_TOKEN_SECRET,
      { expiresIn: env.EMAIL_TOKEN_EXPIRES_IN } as jwt.SignOptions
    );
    const html = generateTemplate('verify-email', {
      name: user.fullName.firstName,
      verifyUrl: `https://shoppix.com/verify-email?token=${token}`,
      year: new Date().getFullYear().toString(),
    });

    await sendEmail({
      to: user.email,
      subject: 'Verify Your Shoppix Email',
      html,
    });

    respondOk(
      res,
      200,
      'Verification email sent successfully. Please check your inbox.'
    );
  } catch (error) {
    console.log('Resend email verification failed : ', error);
    respondServerErr(res);
  }
};
