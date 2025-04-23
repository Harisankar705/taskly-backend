import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { IPayLoad } from '../interfaces/interfaces'
dotenv.config()
export const generateToken=(payload:IPayLoad):string=>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN as string,{expiresIn:'1h'})
}
export const verifyToken=(token:string,type:'access'|'refresh'):IPayLoad|null=>{
    const secret=type==='access'?process.env.ACCESS_TOKEN  as string :process.env.REFRESH_TOKEN as string
    try {
        return jwt.verify(token,secret)as IPayLoad
    } catch (error) {
        throw error
    }
}
export const generateRefreshToken=(payload:IPayLoad):string=>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN as string,{expiresIn:'7d'})
}