"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHAT_NOT_FOUND = void 0;
const ChatRepo_1 = __importDefault(require("@src/repos/ChatRepo"));
const route_errors_1 = require("@src/common/util/route-errors");
const HttpStatusCodes_1 = __importDefault(require("@src/common/constants/HttpStatusCodes"));
exports.CHAT_NOT_FOUND = 'Chat non trouvé';
exports.default = {
    getAll: (filters) => ChatRepo_1.default.getAll(filters),
    getOne: async (id) => {
        const chat = await ChatRepo_1.default.getOne(id);
        if (!chat) {
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.CHAT_NOT_FOUND);
        }
        return chat;
    },
    getFiltered: (filters) => ChatRepo_1.default.getFiltered(filters),
    addOne: (chat) => ChatRepo_1.default.add(chat),
    updateOne: async (id, chat) => {
        const exists = await ChatRepo_1.default.getOne(id);
        if (!exists) {
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.CHAT_NOT_FOUND);
        }
        return (await ChatRepo_1.default.update(id, chat));
    },
    delete: async (id) => {
        const exists = await ChatRepo_1.default.getOne(id);
        if (!exists) {
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.CHAT_NOT_FOUND);
        }
        await ChatRepo_1.default.delete(id);
    },
};
