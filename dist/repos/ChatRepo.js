"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = __importDefault(require("@src/models/Chat"));
exports.default = {
    async getAll(filters) {
        const query = {};
        if (filters) {
            if (filters.race) {
                query.race = filters.race;
            }
            if (filters.tauxEnergie !== undefined &&
                !isNaN(Number(filters.tauxEnergie))) {
                query.tauxEnergie = Number(filters.tauxEnergie);
            }
        }
        return Chat_1.default.find(query).sort({ dateMiseAdoption: -1 });
    },
    getOne: (id) => Chat_1.default.findById(id),
    async getFiltered(filters) {
        const query = {};
        if (filters?.race) {
            query.race = filters.race;
        }
        if (filters?.tauxEnergie !== undefined &&
            !isNaN(Number(filters.tauxEnergie))) {
            query.tauxEnergie = Number(filters.tauxEnergie);
        }
        return Chat_1.default.find(query);
    },
    add: (chat) => Chat_1.default.create(chat),
    update: (id, chat) => Chat_1.default.findByIdAndUpdate(id, { $set: chat }, { new: true }),
    delete: (id) => Chat_1.default.findByIdAndDelete(id),
};
