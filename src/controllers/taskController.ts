import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { STATUS_CODES } from "../utils/statusCodes";

export class TaskController
{
    constructor(private taskService:TaskService){}
    public createTask=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const taskData=req.body
            console.log("IN CReate task")
        if(!taskData)
        {
            res.status(STATUS_CODES.NOT_FOUND).json({message:"taskdata not present!"})
            return
        }
        const user=req.user
        if(!user)
        {
            throw new Error("user is invalid!")
        }
        const task=await this.taskService.createTask(user ,taskData)
        res.status(STATUS_CODES.CREATED).json(task)
        } catch (error) {
        next(error) 
        }
        
    }
    public getTasks=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const user=req.user
            console.log("USER",user)
            if(!user)
                {
                    throw new Error("user is invalid!")
                }
            const task=await this.taskService.getTasks(user)
            console.log(task)
            res.status(STATUS_CODES.OK).json(task)
        } catch (error) {
            next(error)
        }
    }
    public getManagers=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const managers=await this.taskService.getManagers()
            res.status(STATUS_CODES.OK).json(managers)
        } catch (error) {
            next(error)
        }
    }
    public getEmployesUnderManager=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const managerId=req.params.managerId
            const managers=await this.taskService.getEmployeesUnderManager(managerId)
            res.status(STATUS_CODES.OK).json(managers)
        } catch (error) {
            next(error)
        }
    }
    public updateTasks=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            console.log('in updatetask')
            const user=req.user 
            if(!user)
                {
                    throw new Error("user is invalid!")
                }
            const {id}=req.params
            const updateData=req.body
            const task=await this.taskService.updateTask(user,id,updateData)
            res.status(STATUS_CODES.OK).json(task)
        
        } catch (error) {
            next(error)            
        }
    }
    public changeTaskStatus=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const user=req.user 
            const status=req.body
            if(!user)
                {
                    throw new Error("user is invalid!")
                }
            const {id}=req.params
            const task=await this.taskService.updateTaskStatus(id,status)
            res.status(STATUS_CODES.CREATED).json(task)
        
        } catch (error) {
            next(error)            
        }
    }
    public deleteTask=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {id}=req.params
            const user=req.user 
            if(!user)
                {
                    throw new Error("user is invalid!")
                }
            await this.taskService.deleteTask(user,id)
            res.status(STATUS_CODES.OK).json({message:"Task deleted successfully!"})
        } catch (error) {
            next(error)
        }
    }

}