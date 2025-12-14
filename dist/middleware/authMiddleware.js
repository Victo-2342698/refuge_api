"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const route_errors_1 = require("@src/common/util/route-errors");
const ENV_1 = __importDefault(require("@src/common/constants/ENV"));
const HttpStatusCodes_1 = __importDefault(require("@src/common/constants/HttpStatusCodes"));
const authenticateToken = (req, res, next) => {
    if (req.originalUrl.startsWith('/api/auth')) {
        return next();
    }
    if (req.method === 'GET') {
        return next();
    }
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return next(new route_errors_1.RouteError(HttpStatusCodes_1.default.UNAUTHORIZED, "Accès refusé. Jeton d'authentification manquant."));
    }
    const jwtsecret = ENV_1.default.Jwtsecret;
    if (!jwtsecret) {
        return next(new route_errors_1.RouteError(HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR, 'Erreur serveur : JWT_SECRET manquant.'));
    }
    jsonwebtoken_1.default.verify(token, jwtsecret, (err, decoded) => {
        if (err) {
            return next(new route_errors_1.RouteError(HttpStatusCodes_1.default.FORBIDDEN, "Jeton d'authentification invalide ou expiré."));
        }
        req.user = decoded;
        next();
    });
};
exports.default = authenticateToken;
