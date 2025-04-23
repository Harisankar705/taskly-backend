"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const statusCodes_1 = require("../utils/statusCodes");
class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
        this.createTask = async (req, res, next) => {
            try {
                const taskData = req.body;
                console.log("IN CReate task");
                if (!taskData) {
                    res.status(statusCodes_1.STATUS_CODES.NOT_FOUND).json({ message: "taskdata not present!" });
                    return;
                }
                const user = req.user;
                if (!user) {
                    throw new Error("user is invalid!");
                }
                const task = await this.taskService.createTask(user, taskData);
                res.status(statusCodes_1.STATUS_CODES.CREATED).json(task);
            }
            catch (error) {
                next(error);
            }
        };
        this.getTasks = async (req, res, next) => {
            try {
                const user = req.user;
                console.log("USER", user);
                if (!user) {
                    throw new Error("user is invalid!");
                }
                const task = await this.taskService.getTasks(user);
                console.log(task);
                res.status(statusCodes_1.STATUS_CODES.OK).json(task);
            }
            catch (error) {
                next(error);
            }
        };
        this.getManagers = async (req, res, next) => {
            try {
                const managers = await this.taskService.getManagers();
                res.status(statusCodes_1.STATUS_CODES.OK).json(managers);
            }
            catch (error) {
                next(error);
            }
        };
        this.getEmployesUnderManager = async (req, res, next) => {
            try {
                const managerId = req.params.managerId;
                const managers = await this.taskService.getEmployeesUnderManager(managerId);
                res.status(statusCodes_1.STATUS_CODES.OK).json(managers);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateTasks = async (req, res, next) => {
            try {
                console.log('in updatetask');
                const user = req.user;
                if (!user) {
                    throw new Error("user is invalid!");
                }
                const { id } = req.params;
                const updateData = req.body;
                const task = await this.taskService.updateTask(user, id, updateData);
                res.status(statusCodes_1.STATUS_CODES.OK).json(task);
            }
            catch (error) {
                next(error);
            }
        };
        this.changeTaskStatus = async (req, res, next) => {
            try {
                const user = req.user;
                const status = req.body;
                if (!user) {
                    throw new Error("user is invalid!");
                }
                const { id } = req.params;
                const task = await this.taskService.updateTaskStatus(id, status);
                res.status(statusCodes_1.STATUS_CODES.CREATED).json(task);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteTask = async (req, res, next) => {
            try {
                const { id } = req.params;
                const user = req.user;
                if (!user) {
                    throw new Error("user is invalid!");
                }
                await this.taskService.deleteTask(user, id);
                res.status(statusCodes_1.STATUS_CODES.OK).json({ message: "Task deleted successfully!" });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.TaskController = TaskController;
