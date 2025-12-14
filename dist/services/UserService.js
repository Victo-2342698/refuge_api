"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_NOT_FOUND = void 0;
const UserRepo_1 = __importDefault(require("@src/repos/UserRepo"));
exports.USER_NOT_FOUND = 'Utilisateur non trouvé';
exports.default = {
    getAll: () => UserRepo_1.default.getAll(),
    getByEmail: (email) => UserRepo_1.default.getByEmail(email),
    add: (user) => UserRepo_1.default.add(user),
    update: (user) => UserRepo_1.default.update(user),
    delete: (email) => UserRepo_1.default.delete(email),
};
