"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const productsSchema = new Schema({
    title: String,
    image_url: String,
    slug: String,
    price: String,
    discount: String,
    deleted: {
        default: false,
        type: Boolean,
    },
    deletedAt: Date,
    quantity: Number,
    totalPrice: Number,
    brand: String,
    sold_out: {
        default: false,
        type: Boolean,
    },
}, { timestamps: true });
const Products = mongoose_1.default.model("Products", productsSchema, "product");
exports.default = Products;
//# sourceMappingURL=products.model.js.map