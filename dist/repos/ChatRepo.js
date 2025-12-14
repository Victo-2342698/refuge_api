"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = __importDefault(require("@src/models/Chat"));
async function getAll(filters = {}) {
    const query = {};
    if (filters.race) {
        query.race = filters.race;
    }
    if (filters.tauxEnergie) {
        query.tauxEnergie = Number(filters.tauxEnergie);
    }
    if (filters.compatChiens) {
        query.compatChiens = Number(filters.compatChiens);
    }
    if (filters.compatEnfants) {
        query.compatEnfants = Number(filters.compatEnfants);
    }
    if (filters.micropuce !== undefined) {
        query.micropuce = filters.micropuce === 'true';
    }
    if (filters.sterilise !== undefined) {
        query.sterilise = filters.sterilise === 'true';
    }
    return Chat_1.default.find(query).sort({ created: -1 });
}
async function getOne(id) {
    return Chat_1.default.findById(id);
}
async function getFiltered(filters) {
    const query = {};
    if (filters.race)
        query.race = filters.race;
    if (filters.tauxEnergie)
        query.tauxEnergie = filters.tauxEnergie;
    return Chat_1.default.find(query);
}
async function add(chat) {
    const c = new Chat_1.default(chat);
    return await c.save();
}
async function update(id, chat) {
    return Chat_1.default.findByIdAndUpdate(id, chat, {
        new: true,
        runValidators: true,
    });
}
async function delete_(id) {
    await Chat_1.default.findByIdAndDelete(id);
}
exports.default = {
    getAll,
    getOne,
    getFiltered,
    add,
    update,
    delete: delete_,
};
