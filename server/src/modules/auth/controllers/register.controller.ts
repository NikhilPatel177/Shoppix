import { RequestHandler } from 'express';
import {
  respondErr,
  respondServerErr,
  respondWithData,
} from '../../../shared/utils/sendReponse';
import { UserModel } from '../../../shared/models/user.model';
import { RegisterFormData } from '../validators/register.validator';
import { generateTokens, Tokens } from '../utils/generateTokens';
import { env } from '../../../config/env';
import { User } from '../types/auth.types';
import { getRespondedUserData } from '../utils/getRespondedUserData';
import { sendEmail } from '../../../shared/utils/sendEmail';
import { generateTemplate } from '../../../shared/emails/generateTemplates';
import jwt from 'jsonwebtoken';

export const registerUser: RequestHandler = async (req, res) => {
  const data = req.validatedData as RegisterFormData;
  const { email, fullName, password } = data;

  try {
    const isUser = await UserModel.findOne({ email });

    if (isUser) {
      respondErr(
        res,
        400,
        'User is already registered with the email you gave! Please login with it'
      );
      return;
    }

    const newUser = await UserModel.create({ email, fullName, password });

    const tokens: Tokens = generateTokens(newUser.id, newUser.activeRole);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    newUser.refreshToken = tokens.refreshToken;
    await newUser.save();

    const token = jwt.sign(
      { id: newUser.id, purpose: 'Email_Verify' },
      env.EMAIL_TOKEN_SECRET,
      { expiresIn: env.MULTIPURPOSE_TOKEN_EXPIRES_IN } as jwt.SignOptions
    );
    const html = generateTemplate('verify-email', {
      name: newUser.fullName.firstName,
      verifyUrl: `https://shoppix.com/verify-email?token=${token}`,
      year: new Date().getFullYear().toString(),
    });

    await sendEmail({
      to: newUser.email,
      subject: 'Verify Your Shoppix Email',
      html,
    });

    respondWithData<User, string>(
      res,
      getRespondedUserData(newUser),
      201,
      'Registration successful. Please check your email to verify your account.',
      tokens.accessToken
    );
  } catch (error) {
    console.log('Registration failed : ', error);
    respondServerErr(res);
  }
};
