"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("@src/models/User"));
async function getAll() {
    return User_1.default.find();
}
async function getByEmail(email) {
    return User_1.default.findOne({ email });
}
async function add(user) {
    const u = new User_1.default(user);
    await u.save();
}
async function update(user) {
    await User_1.default.updateOne({ email: user.email }, user);
}
async function delete_(email) {
    await User_1.default.deleteOne({ email });
}
exports.default = {
    getAll,
    getByEmail,
    add,
    update,
    delete: delete_,
};
