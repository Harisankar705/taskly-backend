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
exports.AuthService = void 0;
const hashPassword_1 = require("../utils/hashPassword");
const jwtUtils_1 = require("../utils/jwtUtils");
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.AUTH_GOOGLE_ID);
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    login(email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByEmail(email);
                if (!user) {
                    throw new Error(" User not found! Try again!");
                }
                if (user.role !== role) {
                    throw new Error("User not found!Try signup!");
                }
                const isMatch = yield (0, hashPassword_1.comparePassword)(password, user.password);
                if (!isMatch) {
                    throw new Error("Invalid password!");
                }
                const payload = {
                    userId: user._id.toString(),
                    role: user.role
                };
                const accessToken = (0, jwtUtils_1.generateToken)(payload);
                const refreshToken = (0, jwtUtils_1.generateRefreshToken)(payload);
                return { accessToken, refreshToken, user };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new Error("User already exists!");
            }
            const hashedPassword = yield (0, hashPassword_1.hashPassword)(userData.password);
            const newUser = Object.assign(Object.assign({}, userData), { password: hashedPassword, isGoogle: false });
            const user = yield this.userRepository.create(newUser);
            return user;
        });
    }
    verifyGoogleToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticket = yield client.verifyIdToken({
                    idToken: token,
                    audience: process.env.AUTH_GOOGLE_ID
                });
                return ticket.getPayload();
            }
            catch (error) {
            }
        });
    }
}
exports.AuthService = AuthService;
