"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../../controllers/productController"));
const router = express_1.default.Router();
router.get("/products/:id", productController_1.default.index);
router.get("/search", productController_1.default.search);
router.get("/api/products", productController_1.default.loadMoreProduct);
router.post("/api/suggest-product", productController_1.default.suggestProduct);
exports.default = router;
//# sourceMappingURL=products.route.js.map