"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
class TokenService {
    static setCookies(res, role, accessToken, refreshToken) {
        const tokenPrefix = role.toLowerCase();
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie(`${tokenPrefix}AccessToken`, accessToken, {
            httpOnly: false,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            path: '/',
            maxAge: 60 * 60 * 1000
        });
        res.cookie(`${tokenPrefix}RefreshToken`, refreshToken, {
            httpOnly: false,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
    }
}
exports.TokenService = TokenService;
