"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_model_1 = __importDefault(require("../models/cart.model"));
const cartId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = req.cookies.cart_id;
        if (!cartId) {
            const cart = new cart_model_1.default();
            const expiresTime = 1000 * 60 * 60 * 24 * 365;
            res.cookie("cart_id", cart._id, {
                expires: new Date(Date.now() + expiresTime),
            });
            console.log(cart._id);
            yield cart.save();
        }
        else {
            const cart = yield cart_model_1.default.findOne({ _id: req.cookies.cart_id });
            const quantity = cart.products.reduce((init, item) => init + item.quantity, 0);
            req.app.locals.quantityCart = quantity;
        }
    }
    catch (err) {
        console.log(err);
        next();
    }
    next();
});
exports.default = cartId;
//# sourceMappingURL=cartMiddleware.js.map