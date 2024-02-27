"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../controllers/authController"));
const router = express_1.default.Router();
router.get("/login", authController_1.default.loginPage);
router.get("/register", authController_1.default.registerPage);
router.get("/reset-password/otp", authController_1.default.resetPasswordPage);
router.get("/reset-password/reset/:id", authController_1.default.resetPage);
router.post("/auth/change-password/:email", authController_1.default.changePassword);
router.post("/auth/login", authController_1.default.login);
router.post("/auth/register", authController_1.default.register);
router.post("/auth/forgot", authController_1.default.forgotPassword);
router.post("/auth/otp", authController_1.default.verifyOtp);
exports.default = router;
//# sourceMappingURL=auth.route.js.map