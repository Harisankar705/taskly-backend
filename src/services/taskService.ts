import { ObjectId, Types } from 'mongoose';
import { IPayLoad, ITask, ITaskService, IUser } from "../interfaces/interfaces";
import { TaskRepository } from "../repositories/taskRepository";

export class TaskService implements ITaskService{
    constructor(private taskRepository:TaskRepository){}
    async createTask(user:{userId:string,role:"Manager"|"Employee"},taskData:ITask)
    {
        if(user.role!=='Manager')
        {
            throw new Error('You are not authorized to create tasks!')
        }
        return await this.taskRepository.createTask({...taskData,assignedBy:new Types.ObjectId(user.userId)})
    }
    async updateTaskStatus(taskId:string,status:'pending'|'in-progress'|"completed")
    {
        return await this.taskRepository.updateTaskStatus(taskId,status)
    }
    async getManagers()
    {
        return await this.taskRepository.getManagers()
    }
    async getEmployeesUnderManager(managerId:string)
    {
        return await this.taskRepository.getEmployees(managerId)
    }
    async getTasks(user:IPayLoad)
    {
        if(user.role==='Manager')
        {
            return await this.taskRepository.getAllTasks()
        }
        return await this.taskRepository.getTaskAssignedToUser(user.userId as string)
    }
    async updateTask(user:IUser,taskId:string,updateData:Partial<ITask>)
    {
       
        const task=await this.taskRepository.getTaskById(taskId)
        if(!task)
        {
            throw new Error("Task not found!")
        }
        return await this.taskRepository.updateTask(taskId,updateData)
    }
    async deleteTask(user:IUser,taskId:string)
    {
        if(user.role!=='Manager')
            {
                throw new Error('You are not authorized to create tasks!')
    
            }
        const task=await this.taskRepository.getTaskById(taskId)
        if(!task)
            {
                throw new Error("Task not found!")
            }
        return await this.taskRepository.deleteTask(taskId)

        
    }
}