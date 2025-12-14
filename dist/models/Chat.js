"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    nom: { type: String, required: true },
    race: { type: String, required: true },
    numeroDossier: { type: Number, required: true, unique: true },
    dateNaissance: { type: Date, required: true },
    tauxEnergie: { type: Number, min: 1, max: 5, required: true },
    sociabiliteHumain: { type: Number, min: 1, max: 5, required: true },
    compatEnfants: { type: Number, min: 1, max: 5, required: true },
    compatChiens: { type: Number, min: 1, max: 5, required: true },
    compatChats: { type: Number, min: 1, max: 5, required: true },
    description: { type: String, required: true },
    micropuce: { type: Boolean, required: true },
    sterilise: { type: Boolean, required: true },
    vaccinsBase: { type: Boolean, required: true },
    photos: { type: [String], default: [] },
    created: { type: Date, default: Date.now },
});
exports.Chat = (0, mongoose_1.model)('Chat', ChatSchema);
exports.default = exports.Chat;
