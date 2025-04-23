import express from 'express'
import { dbConnection } from './config/db'
import cookieParser from "cookie-parser";
import cors from 'cors'
import { taskRoutes } from './routes/taskRoutes';
import { TaskRepository } from './repositories/taskRepository';
import { TaskController } from './controllers/taskController';
import { TaskService } from './services/taskService';
import { authRoutes } from './routes/authRoutes';
import { AuthController } from './controllers/authController';
import { AuthService } from './services/authService';
import { UserRepository } from './repositories/userRepository';
import { UserModel } from './models/user';
import { errorHandler } from './middleware/errorHandler';
const app=express()
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true

}))
dbConnection()
app.use(express.json())
app.use(cookieParser())
const taskRepository=new TaskRepository()
const taskService=new TaskService(taskRepository)
const taskController=new TaskController(taskService)
const authRepository=new UserRepository(UserModel)
const authService=new AuthService(authRepository)
const authController=new AuthController(authService)
app.use('/',authRoutes(authController))
app.use('/tasks',taskRoutes(taskController))
app.use(errorHandler);
console.log(process.env.FRONTEND_URL)
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})