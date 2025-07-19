import { DecodedJwt } from '@/shared/types/DecodedToken.type';
import { RequestHandler } from 'express';
import { UpdateProfile } from './updateProfile.schema';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import UserModel from '@/shared/models/user.model';
import { flattenObject } from '@/shared/utils/flattenObj';

export const updateProfile: RequestHandler = async (req, res) => {
  const user = req.user as DecodedJwt;
  const data = req.validatedData as UpdateProfile;
  const flatObj = flattenObject(data);
  try {
    const isUser = await UserModel.findById(user.id);

    if (!isUser) {
      return AppError(res, 404, 'User not found');
    }

    isUser.$set(flatObj);
    await isUser.save();

    return AppSuccess(res, 200, 'Profile updated successfully');
  } catch (error) {
    return AppError(res);
  }
};
