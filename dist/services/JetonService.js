"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("./UserService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function generateToken({ email, password, }) {
    console.log('LOGIN EMAIL REÇU:', email);
    console.log('LOGIN PASSWORD REÇU:', password);
    const user = await UserService_1.default.getByEmail(email);
    console.log('USER TROUVÉ:', user);
    if (!user) {
        console.log('USER NON TROUVÉ');
        return null;
    }
    if (password !== user.password) {
        console.log('MOT DE PASSE INCORRECT');
        return null;
    }
    console.log('AUTH OK');
    return jsonwebtoken_1.default.sign({ email: user.email, name: user.name }, process.env.JWTSECRET, { expiresIn: '1h' });
}
exports.default = { generateToken };
