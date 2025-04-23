import mongoose from "mongoose";
import { ITask, ITaskRepository } from "../interfaces/interfaces";
import { TaskModel } from "../models/task";
import { UserModel } from "../models/user";

export class TaskRepository implements ITaskRepository{
    async createTask(taskData:ITask):Promise<ITask>
    {
        const newTask=new TaskModel(taskData)
        const saved=await newTask.save()
        return saved.toObject()as ITask
    }
    async updateTaskStatus(taskId:string,status:'pending'|'in-progress'|"completed"):Promise<ITask>
    {
        const task=await TaskModel.findOne({_id:taskId})
        if(!task)
        {
            throw new Error("Task not found!")
        }
        task.status=status
        const saved=await task.save()
        return saved.toObject()as ITask
    }
    async getAllTasks()
    {
        return await TaskModel.find().populate('assignedTo','name')
    }
    async getManagers()
    {
        return await UserModel.find({role:'Manager'})
    }
    async getEmployees(managerId:string)
    {
        return await UserModel.find({role:'Employee',managerId:managerId})
    }
    async getTaskAssignedToUser(userId:string){
        console.log(userId)
        const userObjectId=new mongoose.Types.ObjectId(userId)
        const task=await TaskModel.find({assignedTo:userObjectId}).populate('assignedTo','name')
        return task
    }
    async getTaskById(id:string)
    {
        const task=await TaskModel.findById(id)
        return task
    }
    async updateTask(id:string,updateData:Partial<ITask>)
    {
        return await TaskModel.findByIdAndUpdate(id,updateData,{new:true})
    }
    async deleteTask(id:string)
        {
            return await TaskModel.findByIdAndDelete(id)
        }
    
}