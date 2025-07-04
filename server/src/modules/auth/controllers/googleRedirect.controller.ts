import { RequestHandler } from "express";
import { generateTokens, Tokens } from "../utils/generateTokens";
import { respondErr, respondServerErr } from "../../../shared/utils/sendReponse";
import { IUser, UserModel } from "../../../shared/models/user.model";

export const handleGoogleRedirect :RequestHandler= async (req,res) => {
    const user = req.user as IUser

    try {
        const isUser = await UserModel.findById(user._id).select('+refreshToken')
        if(!isUser){
            respondErr(res,400,'User not found')
            return;
        }
        const tokens:Tokens=generateTokens(isUser.id,isUser.activeRole)

        isUser.refreshToken = tokens.refreshToken
        await isUser?.save()
        res.redirect(`http://localhost:5173/auth?accessToken=${tokens.accessToken}`)
    } catch (error) {
        
        respondServerErr(res)
    }


}