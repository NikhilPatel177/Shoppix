import { RequestHandler } from 'express';
import { UserModel } from '@models/userModel';
import { genJwtToken } from '@common/utils';
import { LoginType } from '../schemas';
import { REFRESH_TOKEN_COOKIE_OPTIONS } from '../constants/cookieOptions';

export const loginUserController: RequestHandler = async (req, res) => {
  const data = req.validatedData as LoginType;

  try {
    const isUser = await UserModel.findOne({
      $or: [{ email: data.identifier }, { phone: data.identifier }],
    });

    if (!isUser) {
      return res.status(404).json({
        message: 'Validation Error',
        errors: [
          {
            path: 'identifier',
            message: 'User not found with the Email or Phone no. you gave',
          },
        ],
      });
    }

    const isPassCorrect = await isUser.comparePassword(data.password);

    if (!isPassCorrect) {
      return res.status(400).json({
        message: 'Validation Error',
        errors: [{ path: 'password', message: 'Incorrect password' }],
      });
    }

    const accessToken = genJwtToken('accessToken', { _id: isUser._id });
    const refreshToken = genJwtToken('refreshToken', { _id: isUser._id });

    isUser.refreshToken = refreshToken;
    await isUser.save();

    res.cookie('refreshToken', refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

    return res
      .status(200)
      .json({ message: 'User logged in successfull', accessToken });
  } catch (error) {
    console.log('Login Failed :-', error);

    return res
      .status(500)
      .json({ message: 'Something went wrong, Please try again later' });
  }
};
