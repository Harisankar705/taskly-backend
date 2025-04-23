"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const authRoutes = (authController) => {
    const router = (0, express_1.Router)();
    router.post('/signup', authController.signup);
    router.post('/login', authController.login);
    return router;
};
exports.authRoutes = authRoutes;
