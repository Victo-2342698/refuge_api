"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JetonService_1 = __importDefault(require("@src/services/JetonService"));
const HttpStatusCodes_1 = __importDefault(require("@src/common/constants/HttpStatusCodes"));
exports.default = {
    async generateToken(req, res) {
        const { email, password } = req.body;
        if (!email || !password)
            return res
                .status(HttpStatusCodes_1.default.BAD_REQUEST)
                .json({ error: 'Email et mot de passe requis' });
        const token = await JetonService_1.default.generateToken({ email, password });
        if (!token)
            return res
                .status(HttpStatusCodes_1.default.UNAUTHORIZED)
                .json({ error: 'Identifiants invalides' });
        res.json({ token });
    },
};
