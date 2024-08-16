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
const convertImage_1 = __importDefault(require("../helpers/convertImage"));
const products_model_1 = __importDefault(require("../models/products.model"));
exports.default = {
    index: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield products_model_1.default.find({
                deleted: false,
                sold_out: false,
                discount: {
                    $ne: "",
                },
            }).limit(10);
            const cpu = yield products_model_1.default.find({
                deleted: false,
                sold_out: false,
                brand: "cpu",
            }).limit(10);
            const screen = yield products_model_1.default.find({
                deleted: false,
                sold_out: false,
                brand: "man-hinh-may-tinh",
            }).limit(10);
            const vga = yield products_model_1.default.find({
                deleted: false,
                sold_out: false,
                brand: "vga",
            }).limit(10);
            const newProduct = (0, convertImage_1.default)(product);
            const newCpu = (0, convertImage_1.default)(cpu);
            const newScreen = (0, convertImage_1.default)(screen);
            const newVga = (0, convertImage_1.default)(vga);
            res.render("client/pages/home/index.pug", {
                product: newProduct,
                cpu: newCpu,
                screenProduct: newScreen,
                vgaProduct: newVga,
            });
        }
        catch (err) {
            console.log(err);
        }
    }),
};
//# sourceMappingURL=homeController.js.map