"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpStatusCodes_1 = __importDefault(require("@src/common/constants/HttpStatusCodes"));
const ENV_1 = __importDefault(require("@src/common/constants/ENV"));
function authenticateToken(req, res, next) {
    const url = req.originalUrl;
    if (url.includes('/auth/generatetoken') ||
        url.includes('/users/add') ||
        url.includes('/users/all')) {
        return next();
    }
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res
            .status(HttpStatusCodes_1.default.UNAUTHORIZED)
            .json({ error: 'Token requis' });
    }
    jsonwebtoken_1.default.verify(token, ENV_1.default.Jwtsecret, (err) => {
        if (err) {
            return res
                .status(HttpStatusCodes_1.default.FORBIDDEN)
                .json({ error: 'Token invalide' });
        }
        next();
    });
}
exports.default = authenticateToken;
