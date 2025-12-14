"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getFiltered = getFiltered;
exports.getOne = getOne;
exports.add = add;
exports.update = update;
exports.delete_ = delete_;
const ChatService_1 = __importDefault(require("@src/services/ChatService"));
const HttpStatusCodes_1 = __importDefault(require("@src/common/constants/HttpStatusCodes"));
async function getAll(req, res, next) {
    try {
        const chats = await ChatService_1.default.getAll(req.query);
        res.status(HttpStatusCodes_1.default.OK).json({ success: true, data: chats });
    }
    catch (err) {
        next(err);
    }
}
async function getFiltered(req, res, next) {
    try {
        const { race, tauxEnergie } = req.query;
        const chats = await ChatService_1.default.getFiltered({
            race: race,
            tauxEnergie: tauxEnergie ? Number(tauxEnergie) : undefined,
        });
        res.status(HttpStatusCodes_1.default.OK).json({ success: true, data: chats });
    }
    catch (err) {
        next(err);
    }
}
async function getOne(req, res, next) {
    try {
        const chat = await ChatService_1.default.getOne(req.params.id);
        res.status(HttpStatusCodes_1.default.OK).json({ success: true, data: chat });
    }
    catch (err) {
        next(err);
    }
}
async function add(req, res, next) {
    try {
        const created = await ChatService_1.default.addOne(req.body);
        res
            .status(HttpStatusCodes_1.default.CREATED)
            .json({ message: 'Chat créé avec succès.', chat: created });
    }
    catch (err) {
        next(err);
    }
}
async function update(req, res, next) {
    try {
        const updated = await ChatService_1.default.updateOne(req.params.id, req.body);
        res
            .status(HttpStatusCodes_1.default.OK)
            .json({ message: 'Chat mis à jour avec succès.', chat: updated });
    }
    catch (err) {
        next(err);
    }
}
async function delete_(req, res, next) {
    try {
        await ChatService_1.default.delete(req.params.id);
        res
            .status(HttpStatusCodes_1.default.OK)
            .json({ message: 'Chat supprimé avec succès.' });
    }
    catch (err) {
        next(err);
    }
}
exports.default = {
    getAll,
    getFiltered,
    getOne,
    add,
    update,
    delete: delete_,
};
