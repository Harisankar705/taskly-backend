"use strict";
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
    async login(email, password, role) {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new Error(" User not found! Try again!");
            }
            if (user.role !== role) {
                throw new Error("User not found!Try signup!");
            }
            const isMatch = await (0, hashPassword_1.comparePassword)(password, user.password);
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
    }
    async register(userData) {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error("User already exists!");
        }
        const hashedPassword = await (0, hashPassword_1.hashPassword)(userData.password);
        const newUser = { ...userData, password: hashedPassword, isGoogle: false };
        const user = await this.userRepository.create(newUser);
        return user;
    }
    async verifyGoogleToken(token) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.AUTH_GOOGLE_ID
            });
            return ticket.getPayload();
        }
        catch (error) {
        }
    }
}
exports.AuthService = AuthService;
