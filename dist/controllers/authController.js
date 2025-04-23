"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const validateRole_1 = require("../utils/validateRole");
const statusCodes_1 = require("../utils/statusCodes");
const google_auth_library_1 = require("google-auth-library");
const tokenService_1 = require("../services/tokenService");
const client = new google_auth_library_1.OAuth2Client(process.env.AUTH_GOOGLE_ID);
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.signup = async (req, res, next) => {
            try {
                console.log('in singup', req.body);
                const userdata = req.body;
                if (!userdata) {
                    res.status(statusCodes_1.STATUS_CODES.FORBIDDEN).json({ message: "user details required!" });
                }
                console.log(userdata.role);
                const roleValidation = (0, validateRole_1.validateRole)(userdata.role);
                if (!roleValidation.valid) {
                    res.status(statusCodes_1.STATUS_CODES.BAD_REQUEST).json({ message: roleValidation.message });
                    return;
                }
                const user = await this.authService.register(userdata);
                res.status(statusCodes_1.STATUS_CODES.CREATED).json(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const loginData = req.body;
                console.log('req.body', req.body);
                if (!loginData.email || !loginData.password || !loginData.role) {
                    res.status(statusCodes_1.STATUS_CODES.BAD_REQUEST).json({ message: "Data not present!" });
                    return;
                }
                const roleValidation = await (0, validateRole_1.validateRole)(loginData.role);
                if (!roleValidation.valid) {
                    res.status(statusCodes_1.STATUS_CODES.BAD_REQUEST).json({ message: roleValidation.message });
                    return;
                }
                const { accessToken, refreshToken, user } = await this.authService.login(loginData.email, loginData.password, loginData.role);
                tokenService_1.TokenService.setCookies(res, loginData.role, accessToken, refreshToken);
                res.status(statusCodes_1.STATUS_CODES.CREATED).json({ user, token: accessToken, refreshToken });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.AuthController = AuthController;
