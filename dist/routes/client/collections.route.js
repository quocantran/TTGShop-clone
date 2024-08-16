"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const collectionsController_1 = __importDefault(require("../../controllers/collectionsController"));
const router = express_1.default.Router();
router.get("/collections/:id", collectionsController_1.default.index);
exports.default = router;
//# sourceMappingURL=collections.route.js.map