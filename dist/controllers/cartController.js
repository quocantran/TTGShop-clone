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
const products_model_1 = __importDefault(require("../models/products.model"));
const convertMoney_1 = __importDefault(require("../helpers/convertMoney"));
exports.default = {
    addToCart: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const cart = yield cart_model_1.default.findOne({ _id: req.cookies.cart_id });
        const product = yield products_model_1.default.findOne({ _id: req.params.id });
        if (product.price === "0₫")
            return res.redirect("back");
        if (cart) {
            const isExistProduct = cart.products.find((item) => item.product_id === req.params.id);
            if (isExistProduct) {
                let newQuantity;
                if (!req.body.quantity) {
                    newQuantity = isExistProduct.quantity + 1;
                }
                else {
                    newQuantity = isExistProduct.quantity + parseInt(req.body.quantity);
                }
                yield cart_model_1.default.updateOne({ _id: req.cookies.cart_id, "products.product_id": req.params.id }, {
                    "products.$.quantity": newQuantity,
                });
            }
            else {
                if (!req.body.quantity) {
                    const product = {
                        product_id: req.params.id,
                        quantity: 1,
                    };
                    yield cart_model_1.default.updateOne({ _id: req.cookies.cart_id }, {
                        $push: { products: product },
                    });
                }
                else {
                    const product = {
                        product_id: req.params.id,
                        quantity: parseInt(req.body.quantity),
                    };
                    yield cart_model_1.default.updateOne({ _id: req.cookies.cart_id }, {
                        $push: { products: product },
                    });
                }
            }
            req.app.locals.cartData = product;
            req.flash("addSuccess", "success");
            if (req.body.cart !== undefined)
                res.redirect("/cart");
            else
                res.redirect("back");
        }
    }),
    cartPage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const cart = yield cart_model_1.default.findOne({ _id: req.cookies.cart_id });
        const quantityMap = {};
        cart.products.forEach((item) => {
            quantityMap[item.product_id] = item.quantity;
        });
        const product_id = cart.products.map((item) => item.product_id);
        const product = yield products_model_1.default.find({
            _id: {
                $in: product_id,
            },
        });
        for (const item of product) {
            item.image_url = item.image_url.replace("small", "medium");
            const productIdString = item._id.toString();
            if (quantityMap.hasOwnProperty(productIdString)) {
                item.quantity = quantityMap[productIdString];
            }
            const price = item.price.replace(/,/g, "").replace("₫", "");
            const qty = item.quantity;
            item.totalPrice = parseFloat(price) * qty;
        }
        let totalPrice = product.reduce((init, item) => {
            const price = item.totalPrice;
            return price + init;
        }, 0);
        let convertPrice = (0, convertMoney_1.default)(totalPrice);
        convertPrice = convertPrice.replace(/\./g, ",");
        res.render("client/pages/cart/index.pug", {
            totalPrice: convertPrice,
            priceInteger: totalPrice,
            product: product,
        });
    }),
    removeProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        yield cart_model_1.default.updateOne({ _id: req.cookies.cart_id }, {
            $pull: {
                products: {
                    product_id: id,
                },
            },
        });
        res.redirect("back");
    }),
};
//# sourceMappingURL=cartController.js.map