import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { verifyToken } from "../middleware/verifyToken";

export const taskRoutes=(taskController:TaskController)=>{
    const router=Router()
    router.post('/',verifyToken,taskController.createTask)
    router.get('/',verifyToken,taskController.getTasks)
    router.put('/:id',verifyToken,taskController.updateTasks)
    router.put('/updatestatus/:id',verifyToken,taskController.changeTaskStatus)
    router.get('/managers',taskController.getManagers)
    router.get('/employees',taskController.getEmployesUnderManager)
    router.delete('/:id',verifyToken,taskController.deleteTask)
    return router
}