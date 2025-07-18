import UserModel from '@/shared/models/user.model';
import { DecodedJwt } from '@/shared/types/DecodedToken.type';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import { RequestHandler } from 'express';
import { ProfileUpdate } from '../schemas/profile.schema';
import { flattenObject } from '@/shared/utils/flattenObject';

export const updateProfile: RequestHandler = async (req, res) => {
  const user = req.user as DecodedJwt;
  const data = req.validatedData as ProfileUpdate;
  const flatObj = flattenObject(data);
  try {
    const isUser = await UserModel.findByIdAndUpdate(
      user.id,
      { $set: flatObj },
      {
        runValidators: true,
      }
    );

    if (!isUser) {
      return AppError(res, 404, 'User not found');
    }

    return AppSuccess(res, 200, 'Updated successfully');
  } catch (error) {
    return AppError(res);
  }
};
