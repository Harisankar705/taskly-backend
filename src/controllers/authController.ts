import { NextFunction, Request, Response } from "express";
import { validateRole } from "../utils/validateRole";
import { STATUS_CODES } from "../utils/statusCodes";
import { OAuth2Client } from 'google-auth-library';
import { TokenService } from "../services/tokenService";
import { IAuthController, IUser } from "../interfaces/interfaces";
import { AuthService } from "../services/authService";
const client=new OAuth2Client(process.env.AUTH_GOOGLE_ID)

export class AuthController implements IAuthController{
    constructor(private authService:AuthService){}
    public signup=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try {
            console.log('in singup',req.body)
            const userdata=req.body
            if(!userdata)
            {
                res.status(STATUS_CODES.FORBIDDEN).json({message:"user details required!"})
            }
            console.log(userdata.role)
            const roleValidation=validateRole(userdata.role)
            if(!roleValidation.valid)
            {
                res.status(STATUS_CODES.BAD_REQUEST).json({message:roleValidation.message})
                return
            }
            const user=await this.authService.register(userdata as IUser)
            res.status(STATUS_CODES.CREATED).json(user)
        } catch (error) {
            next(error)
        }
    }
    public login=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try {
            const loginData=req.body
            console.log('req.body',req.body)
            if(!loginData.email ||!loginData.password || !loginData.role)
            {
                res.status(STATUS_CODES.BAD_REQUEST).json({message:"Data not present!"})
                return
            }
            const roleValidation=await validateRole(loginData.role)
            if(!roleValidation.valid)
                {
                    res.status(STATUS_CODES.BAD_REQUEST).json({message:roleValidation.message})
                    return
                }
            const {accessToken,refreshToken,user}=await this.authService.login(loginData.email,loginData.password,loginData.role)
            TokenService.setCookies(res,loginData.role,accessToken,refreshToken)
            res.status(STATUS_CODES.CREATED).json({user,token:accessToken,refreshToken})

        } catch (error) {
            next(error)
        }
    }
   

}