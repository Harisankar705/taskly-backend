"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
const verifyToken = (token, type) => {
    const secret = type === 'access' ? process.env.ACCESS_TOKEN : process.env.REFRESH_TOKEN;
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        throw error;
    }
};
exports.verifyToken = verifyToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '7d' });
};
exports.generateRefreshToken = generateRefreshToken;
