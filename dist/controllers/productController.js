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
        try {
            const slug = req.params.id;
            const product = yield products_model_1.default.findOne({
                slug: slug,
            });
            const brand = product.brand;
            const suggestProduct = yield products_model_1.default.find({ brand: brand }).limit(10);
            if (!product) {
                res.redirect("/");
                return;
            }
            product.image_url = product.image_url.replace("small", "large");
            const newSuggest = (0, convertImage_1.default)(suggestProduct);
            res.render("client/pages/product/index.pug", {
                product: product,
                suggestProduct: newSuggest,
                brand: brand,
            });
        }
        catch (err) {
            res.redirect("/");
        }
    }),
    loadMoreProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const skip = parseInt(req.query.skip) || 0;
            const brand = req.query.brand || null;
            let product;
            if (brand === "all") {
                product = yield products_model_1.default.find({}).limit(10).skip(skip);
            }
            else {
                product = yield products_model_1.default.find({ brand: brand }).limit(10).skip(skip);
            }
            const newProduct = (0, convertImage_1.default)(product);
            res.json(newProduct);
        }
        catch (err) {
            res.redirect("back");
        }
    }),
    suggestProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const keyword = req.body.keyword;
        const products = yield products_model_1.default.find({
            title: { $regex: new RegExp(keyword, "i") },
        }).limit(5);
        for (const item of products) {
            item.image_url.replace("small", "compact");
        }
        if (products.length > 0) {
            res.json(products);
        }
    }),
    search: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const keyword = req.query.keyword;
        const regex = new RegExp(keyword, "i");
        const MAX_PRODUCT = 15;
        const currentPage = parseInt(req.query.page) || 1;
        let totalProduct = yield products_model_1.default.find({
            title: { $regex: regex },
        });
        let sizeProduct = totalProduct.length;
        const products = yield products_model_1.default.find({
            title: { $regex: regex },
        })
            .limit(MAX_PRODUCT)
            .skip(MAX_PRODUCT * (currentPage - 1));
        const newProducts = (0, convertImage_1.default)(products);
        let totalPage;
        if (sizeProduct % MAX_PRODUCT == 0)
            totalPage = Math.floor(sizeProduct / MAX_PRODUCT);
        else
            totalPage = Math.floor(sizeProduct / MAX_PRODUCT) + 1;
        res.render("client/pages/search/index.pug", {
            totalProduct: sizeProduct,
            products: newProducts,
            keyword: keyword,
            currentPage: currentPage,
            totalPage: totalPage,
        });
    }),
    getProduct: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const product = yield products_model_1.default.findOne({
            _id: id
        });
        product.image_url = product.image_url.replace("small", "master");
        res.json(product);
    })
};
//# sourceMappingURL=productController.js.map