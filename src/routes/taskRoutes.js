"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = require("express");
const verifyToken_1 = require("../middleware/verifyToken");
const taskRoutes = (taskController) => {
    const router = (0, express_1.Router)();
    router.post('/', verifyToken_1.verifyToken, taskController.createTask);
    router.get('/', verifyToken_1.verifyToken, taskController.getTasks);
    router.put('/:id', verifyToken_1.verifyToken, taskController.updateTasks);
    router.put('/updatestatus/:id', verifyToken_1.verifyToken, taskController.changeTaskStatus);
    router.get('/managers', taskController.getManagers);
    router.get('/employees', taskController.getEmployesUnderManager);
    router.delete('/:id', verifyToken_1.verifyToken, taskController.deleteTask);
    return router;
};
exports.taskRoutes = taskRoutes;
