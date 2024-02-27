"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = __importDefault(require("../../controllers/cartController"));
const router = express_1.default.Router();
router.get("/cart", cartController_1.default.cartPage);
router.post("/add-to-cart/:id", cartController_1.default.addToCart);
router.post("/remove/:id", cartController_1.default.removeProduct);
exports.default = router;
//# sourceMappingURL=cart.route.js.map