import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../utils/statusCodes";
import jwt from 'jsonwebtoken'
export const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer "))
    {
        res.status(STATUS_CODES.UNAUTHORIZED).json({message:"Token missing!"})
        return
    }
    const token=authHeader.split(' ')[1]
    try {
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN!)as {userId:string,role:"Manager"|"Employee"}
        req.user=decoded
        next()
    } catch (error) {
        res.status(STATUS_CODES.FORBIDDEN).json({message:"Invalid or expired token!"})
        return
    }
}