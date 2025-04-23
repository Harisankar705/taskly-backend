"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const mongoose_1 = require("mongoose");
class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async createTask(user, taskData) {
        if (user.role !== 'Manager') {
            throw new Error('You are not authorized to create tasks!');
        }
        return await this.taskRepository.createTask({ ...taskData, assignedBy: new mongoose_1.Types.ObjectId(user.userId) });
    }
    async updateTaskStatus(taskId, status) {
        return await this.taskRepository.updateTaskStatus(taskId, status);
    }
    async getManagers() {
        return await this.taskRepository.getManagers();
    }
    async getEmployeesUnderManager(managerId) {
        return await this.taskRepository.getEmployees(managerId);
    }
    async getTasks(user) {
        if (user.role === 'Manager') {
            return await this.taskRepository.getAllTasks();
        }
        return await this.taskRepository.getTaskAssignedToUser(user.userId);
    }
    async updateTask(user, taskId, updateData) {
        const task = await this.taskRepository.getTaskById(taskId);
        if (!task) {
            throw new Error("Task not found!");
        }
        return await this.taskRepository.updateTask(taskId, updateData);
    }
    async deleteTask(user, taskId) {
        if (user.role !== 'Manager') {
            throw new Error('You are not authorized to create tasks!');
        }
        const task = await this.taskRepository.getTaskById(taskId);
        if (!task) {
            throw new Error("Task not found!");
        }
        return await this.taskRepository.deleteTask(taskId);
    }
}
exports.TaskService = TaskService;
