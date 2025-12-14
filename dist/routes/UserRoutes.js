"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("@src/services/UserService"));
const HttpStatusCodes_1 = __importDefault(require("@src/common/constants/HttpStatusCodes"));
async function getAll(_, res) {
    const users = await UserService_1.default.getAll();
    return res.status(HttpStatusCodes_1.default.OK).json({ users });
}
async function add(req, res) {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res
            .status(HttpStatusCodes_1.default.BAD_REQUEST)
            .json({ error: 'Champs requis' });
    }
    await UserService_1.default.add({ email, password, name });
    return res.status(HttpStatusCodes_1.default.CREATED).end();
}
async function update(req, res) {
    const { email, password, name } = req.body;
    if (!email) {
        return res
            .status(HttpStatusCodes_1.default.BAD_REQUEST)
            .json({ error: 'Email requis' });
    }
    await UserService_1.default.update({ email, password, name });
    return res.status(HttpStatusCodes_1.default.OK).end();
}
async function delete_(req, res) {
    const { email } = req.params;
    if (!email) {
        return res
            .status(HttpStatusCodes_1.default.BAD_REQUEST)
            .json({ error: 'Email requis' });
    }
    await UserService_1.default.delete(email);
    return res.status(HttpStatusCodes_1.default.OK).end();
}
exports.default = {
    getAll,
    add,
    update,
    delete: delete_,
};
