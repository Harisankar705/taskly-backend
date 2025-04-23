"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const statusCodes_1 = require("../utils/statusCodes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(statusCodes_1.STATUS_CODES.UNAUTHORIZED).json({ message: "Token missing!" });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(statusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: "Invalid or expired token!" });
        return;
    }
};
exports.verifyToken = verifyToken;
