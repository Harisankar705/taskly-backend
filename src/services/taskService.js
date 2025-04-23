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
exports.TaskService = void 0;
const mongoose_1 = require("mongoose");
class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    createTask(user, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.role !== 'Manager') {
                throw new Error('You are not authorized to create tasks!');
            }
            return yield this.taskRepository.createTask(Object.assign(Object.assign({}, taskData), { assignedBy: new mongoose_1.Types.ObjectId(user.userId) }));
        });
    }
    updateTaskStatus(taskId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskRepository.updateTaskStatus(taskId, status);
        });
    }
    getManagers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskRepository.getManagers();
        });
    }
    getEmployeesUnderManager(managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskRepository.getEmployees(managerId);
        });
    }
    getTasks(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.role === 'Manager') {
                return yield this.taskRepository.getAllTasks();
            }
            return yield this.taskRepository.getTaskAssignedToUser(user.userId);
        });
    }
    updateTask(user, taskId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.getTaskById(taskId);
            if (!task) {
                throw new Error("Task not found!");
            }
            return yield this.taskRepository.updateTask(taskId, updateData);
        });
    }
    deleteTask(user, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.role !== 'Manager') {
                throw new Error('You are not authorized to create tasks!');
            }
            const task = yield this.taskRepository.getTaskById(taskId);
            if (!task) {
                throw new Error("Task not found!");
            }
            return yield this.taskRepository.deleteTask(taskId);
        });
    }
}
exports.TaskService = TaskService;
