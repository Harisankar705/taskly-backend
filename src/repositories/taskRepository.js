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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const task_1 = require("../models/task");
const user_1 = require("../models/user");
class TaskRepository {
    createTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = new task_1.TaskModel(taskData);
            const saved = yield newTask.save();
            return saved.toObject();
        });
    }
    updateTaskStatus(taskId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield task_1.TaskModel.findOne({ _id: taskId });
            if (!task) {
                throw new Error("Task not found!");
            }
            task.status = status;
            const saved = yield task.save();
            return saved.toObject();
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_1.TaskModel.find().populate('assignedTo', 'name');
        });
    }
    getManagers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.UserModel.find({ role: 'Manager' });
        });
    }
    getEmployees(managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.UserModel.find({ role: 'Employee', managerId: managerId });
        });
    }
    getTaskAssignedToUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(userId);
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            const task = yield task_1.TaskModel.find({ assignedTo: userObjectId }).populate('assignedTo', 'name');
            return task;
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield task_1.TaskModel.findById(id);
            return task;
        });
    }
    updateTask(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_1.TaskModel.findByIdAndUpdate(id, updateData, { new: true });
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_1.TaskModel.findByIdAndDelete(id);
        });
    }
}
exports.TaskRepository = TaskRepository;
