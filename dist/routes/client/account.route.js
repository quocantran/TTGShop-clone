"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountController_1 = __importDefault(require("../../controllers/accountController"));
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const router = express_1.default.Router();
router.get("/", authMiddleware_1.default.verifyToken, accountController_1.default.index);
exports.default = router;
//# sourceMappingURL=account.route.js.map