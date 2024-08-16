"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const cartSchema = new Schema({
    user_id: String,
    products: [
        {
            product_id: String,
            quantity: Number,
        },
    ],
}, { timestamps: true });
const Cart = mongoose_1.default.model("Cart", cartSchema, "cart");
exports.default = Cart;
//# sourceMappingURL=cart.model.js.map