import { NextFunction, Request, Response } from "express";
import { CustomError } from "../interfaces/interfaces";
import { STATUS_CODES } from "../utils/statusCodes";
export const errorHandler=(err:CustomError,req:Request,res:Response,next:NextFunction)=>{
    console.error(err.stack)
    res.status(err.status||STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        success:false,
        message:err.message||"Something went wrong"
    })
}
