import { RequestHandler } from 'express';
import { UserModel } from '@models/userModel';
import { LoginType } from '../schemas';

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

    return res.status(200).json({ message: 'User logged in successfull' });
  } catch (error) {
    console.log('Login Failed :-', error);

    return res
      .status(500)
      .json({ message: 'Something went wrong, Please try again later' });
  }
};
