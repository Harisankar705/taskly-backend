import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "google-auth-library";
import { ObjectId, Types } from "mongoose";

export interface IUser {
    _id?:string
    name?:string,
    email?:string,
    password?:string,
    role?:"Manager"|"Employee",
    isGoogle?:boolean,
    managerId?:string
}
export interface ITask{
    taskName:string,
    assignedTo:Types.ObjectId|undefined,
    assignedBy:Types.ObjectId|undefined,
    date:Date,
    status:string,
    description:string,
    priority:string,
}
export interface ILoginResponse{
    accessToken:string,
    refreshToken:string,
    user:IUser,

}
export interface IPayLoad{
    userId:string,
    role:'Manager'|"Employee"
}
export interface IUserRepository{
    findByEmail(email:string):Promise<IUser|null>
}
export interface IAuthService {
    login(email:string,password:string,role:"Manager"|"Employee"):Promise<ILoginResponse>
    verifyGoogleToken(token:string):Promise<TokenPayload|undefined>
}
export interface ITaskService {
    createTask(user:{userId:string,role:"Manager"|"Employee"},taskData:ITask):Promise<ITask>
    getTasks(user:IUser):Promise<ITask[]>,
    updateTask(user:IUser,taskId:string,updateData:Partial<ITask>):Promise<ITask|null>
    deleteTask(user:IUser,taskId:string):Promise<ITask|null>
}
export interface ITaskController {
    createTask(req:Request,res:Response):Promise<ITask>
    getTasks(user:IUser):Promise<ITask[]>,
    updateTask(user:IUser,taskId:string,updateData:Partial<ITask>):Promise<ITask|null>
    deleteTask(user:IUser,taskId:string):Promise<ITask|null>
}
export interface IAuthController{
    signup(req:Request,res:Response,next:NextFunction):Promise<void>
    login(req:Request,res:Response,next:NextFunction):Promise<void>

}
export interface ITaskRepository
{
    createTask(taskData:ITask|undefined):Promise<ITask>
    getAllTasks():Promise<ITask[]>,
    getTaskAssignedToUser(userId:string):Promise<ITask[]>
    getTaskById(id:string):Promise<ITask|null>
    updateTask(id:string,updateData:Partial<ITask>):Promise<ITask|null>
    deleteTask(id:string):Promise<ITask|null>


}
export interface IAuthUser{
    _id:string,
    role:"Manager"|"Employee"
}
export interface CustomError extends Error
{
    status?:number
}