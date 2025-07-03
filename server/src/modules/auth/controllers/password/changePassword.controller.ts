import { RequestHandler } from 'express';
import { changePasswordFormData } from '../../validators/password.validator';
import { DecodedUser } from '../../../../shared/types/decodedUser.type';
import {
  respondErr,
  respondOk,
  respondServerErr,
} from '../../../../shared/utils/sendReponse';
import { UserModel } from '../../../../shared/models/user.model';

export const changeThePassword: RequestHandler = async (req, res) => {
  const data = req.validatedData as changePasswordFormData;
  const userData = req.user as DecodedUser;

  try {
    const user = await UserModel.findById(userData.id).select('+password');
    if (!user) {
      respondErr(res, 404, 'Invalid token : user not found');
      return;
    }

    const isPasswordCorrect = await user.comparePassword(data.currentPassword);
    if (!isPasswordCorrect) {
      respondErr(res, 400, 'Invalid current password');
      return;
    }

    user.password = data.newPassword;
    await user.save();

    respondOk(res, 200, 'Password changed successfully');
  } catch (error) {
    console.log('Change password failed : ', error);
    respondServerErr(res);
  }
};
