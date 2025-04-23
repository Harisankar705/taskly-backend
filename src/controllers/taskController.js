"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const statusCodes_1 = require("../utils/statusCodes");
class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
        this.createTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                const task = yield this.taskService.createTask(user, taskData);
                res.status(statusCodes_1.STATUS_CODES.CREATED).json(task);
            }
            catch (error) {
                next(error);
            }
        });
        this.getTasks = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                console.log("USER", user);
                if (!user) {
                    throw new Error("user is invalid!");
                }
                const task = yield this.taskService.getTasks(user);
                console.log(task);
                res.status(statusCodes_1.STATUS_CODES.OK).json(task);
            }
            catch (error) {
                next(error);
            }
        });
        this.getManagers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const managers = yield this.taskService.getManagers();
                res.status(statusCodes_1.STATUS_CODES.OK).json(managers);
            }
            catch (error) {
                next(error);
            }
        });
        this.getEmployesUnderManager = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const managerId = req.params.managerId;
                const managers = yield this.taskService.getEmployeesUnderManager(managerId);
                res.status(statusCodes_1.STATUS_CODES.OK).json(managers);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateTasks = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('in updatetask');
                const user = req.user;
                if (!user) {
                    throw new Error("user is invalid!");
                }
                const { id } = req.params;
                const updateData = req.body;
                const task = yield this.taskService.updateTask(user, id, updateData);
                res.status(statusCodes_1.STATUS_CODES.OK).json(task);
            }
            catch (error) {
                next(error);
            }
        });
        this.changeTaskStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const status = req.body;
                if (!user) {
                    throw new Error("user is invalid!");
                }
                const { id } = req.params;
                const task = yield this.taskService.updateTaskStatus(id, status);
                res.status(statusCodes_1.STATUS_CODES.CREATED).json(task);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = req.user;
                if (!user) {
                    throw new Error("user is invalid!");
                }
                yield this.taskService.deleteTask(user, id);
                res.status(statusCodes_1.STATUS_CODES.OK).json({ message: "Task deleted successfully!" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TaskController = TaskController;
