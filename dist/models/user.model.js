"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    address: {
        type: String,
        default: ""
    },
    phone: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema, "user");
exports.default = User;
//# sourceMappingURL=user.model.js.map