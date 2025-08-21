import { RequestHandler } from 'express';
import { UserModel } from '@models/userModel';
import { RegisterType } from '../schemas';

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

    return res.status(201).json({ message: 'User registeration successfull',data:newUser });
  } catch (error) {
    console.log('Registration Failed :-', error);

    return res
      .status(500)
      .json({ message: 'Something went wrong, Please try again later' });
  }
};
