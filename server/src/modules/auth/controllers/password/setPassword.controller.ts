import { RequestHandler } from "express";
import { setPasswordFormData } from "../../validators/password.validator";
import { DecodedUser } from "../../../../shared/types/decodedUser.type";
import { respondErr, respondOk, respondServerErr } from "../../../../shared/utils/sendReponse";
import { UserModel } from "../../../../shared/models/user.model";

export const setPassword :RequestHandler=async (req,res) => {
    const userData = req.user as DecodedUser
    const {id} = userData
    const data = req.validatedData as setPasswordFormData
    const {newPassword}=data

    if (newPassword.length < 8) {
      respondErr(res, 400, 'Password must be at least 8 characters');
      return;
    }

    try {
      const user = await UserModel.findById(id).select('+password');
       if (!user) {
         respondErr(res, 404, 'Invalid token : user not found');
         return;
       }

       if(user.password){
        respondErr(res, 400, 'Password already set');
        return;
       }

       if (user.provider?.includes('credentials') && user.password) {
         respondErr(res, 400, 'You already use email/password login');
         return;
       }

       user.password = newPassword
       await user.save()

       respondOk(res,200,'Password set successfully')
    } catch (error) {
        console.log('Set password failed : ',error)
        respondServerErr(res)
    }
} 