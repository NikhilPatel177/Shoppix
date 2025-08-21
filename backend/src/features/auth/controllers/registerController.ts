import { RequestHandler } from 'express';
import { UserModel } from '@models/userModel';
import { genJwtToken } from '@common/utils';
import { RegisterType } from '../schemas';
import { REFRESH_TOKEN_COOKIE_OPTIONS } from '../constants/cookieOptions';

export const registerUserController: RequestHandler = async (req, res) => {
  const data = req.validatedData as RegisterType;

  try {
    const isUser = await UserModel.findOne({ email: data.email });

    if (isUser) {
      return res
        .status(400)
        .json({ message: 'A user is already registered with this email' });
    }

    const newUser = await UserModel.create({
      email: data.email,
      password: data.password,
    });

    const accessToken = genJwtToken('accessToken', { _id: newUser._id });
    const refreshToken = genJwtToken('refreshToken', { _id: newUser._id });

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie('refreshToken', refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

    return res.status(201).json({
      message: 'User registeration successfull',
      data: newUser,
      accessToken,
    });
  } catch (error) {
    console.log('Registration Failed :-', error);

    return res
      .status(500)
      .json({ message: 'Something went wrong, Please try again later' });
  }
};
