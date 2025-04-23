import { Response } from "express";

export class TokenService{
    static setCookies(res:Response,role:"Manager"|"Employee",accessToken:string,refreshToken:string):void{
        const tokenPrefix=role.toLowerCase()
                    const isProduction=process.env.NODE_ENV==='production'
                    res.cookie(`${tokenPrefix}AccessToken`,accessToken,{
                        httpOnly:false,
                        secure:isProduction,
                        sameSite:isProduction?'none':'lax',
                        path:'/',
                        maxAge:60*60*1000
                    })
                    res.cookie(`${tokenPrefix}RefreshToken`,refreshToken,{
                        httpOnly:false,
                        secure:isProduction,
                        sameSite:isProduction?'none':'lax',
                        path:'/',
                        maxAge:7*24*60*60*1000
                    })
    }}