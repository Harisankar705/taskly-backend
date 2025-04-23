"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const task_1 = require("../models/task");
const user_1 = require("../models/user");
class TaskRepository {
    async createTask(taskData) {
        const newTask = new task_1.TaskModel(taskData);
        const saved = await newTask.save();
        return saved.toObject();
    }
    async updateTaskStatus(taskId, status) {
        const task = await task_1.TaskModel.findOne({ _id: taskId });
        if (!task) {
            throw new Error("Task not found!");
        }
        task.status = status;
        const saved = await task.save();
        return saved.toObject();
    }
    async getAllTasks() {
        return await task_1.TaskModel.find().populate('assignedTo', 'name');
    }
    async getManagers() {
        return await user_1.UserModel.find({ role: 'Manager' });
    }
    async getEmployees(managerId) {
        return await user_1.UserModel.find({ role: 'Employee', managerId: managerId });
    }
    async getTaskAssignedToUser(userId) {
        console.log(userId);
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        const task = await task_1.TaskModel.find({ assignedTo: userObjectId }).populate('assignedTo', 'name');
        return task;
    }
    async getTaskById(id) {
        const task = await task_1.TaskModel.findById(id);
        return task;
    }
    async updateTask(id, updateData) {
        return await task_1.TaskModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    async deleteTask(id) {
        return await task_1.TaskModel.findByIdAndDelete(id);
    }
}
exports.TaskRepository = TaskRepository;
