"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const taskRoutes_1 = require("./routes/taskRoutes");
const taskRepository_1 = require("./repositories/taskRepository");
const taskController_1 = require("./controllers/taskController");
const taskService_1 = require("./services/taskService");
const authRoutes_1 = require("./routes/authRoutes");
const authController_1 = require("./controllers/authController");
const authService_1 = require("./services/authService");
const userRepository_1 = require("./repositories/userRepository");
const user_1 = require("./models/user");
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
(0, db_1.dbConnection)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const taskRepository = new taskRepository_1.TaskRepository();
const taskService = new taskService_1.TaskService(taskRepository);
const taskController = new taskController_1.TaskController(taskService);
const authRepository = new userRepository_1.UserRepository(user_1.UserModel);
const authService = new authService_1.AuthService(authRepository);
const authController = new authController_1.AuthController(authService);
app.use('/', (0, authRoutes_1.authRoutes)(authController));
app.use('/tasks', (0, taskRoutes_1.taskRoutes)(taskController));
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
