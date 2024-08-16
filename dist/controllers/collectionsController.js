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
const products_model_1 = __importDefault(require("../models/products.model"));
const convertImage_1 = __importDefault(require("../helpers/convertImage"));
exports.default = {
    index: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const brand = req.params.id;
        let product;
        let quantity;
        if (brand !== "all") {
            product = yield products_model_1.default.find({
                brand: brand,
            }).limit(10);
            quantity = yield products_model_1.default.countDocuments({
                brand: brand,
            });
        }
        else {
            product = yield products_model_1.default.find().limit(10);
            quantity = yield products_model_1.default.countDocuments({});
        }
        if (product.length === 0) {
            res.redirect("/");
            return;
        }
        let title = "";
        if (brand === "balo-tui")
            title = "Balo - túi sách";
        if (brand === "pc")
            title = "PC - Máy tính để bàn";
        if (brand === "vga")
            title = "VGA - Card màn hình";
        if (brand === "cpu")
            title = "CPU";
        if (brand === "man-hinh-may-tinh")
            title = "Màn hình máy tính";
        if (brand === "all")
            title = "Tất cả sản phẩm";
        const newProduct = (0, convertImage_1.default)(product);
        res.render("client/pages/collections/index.pug", {
            product: newProduct,
            title: title,
            quantity: quantity,
        });
    }),
};
//# sourceMappingURL=collectionsController.js.map