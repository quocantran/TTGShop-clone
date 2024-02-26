import express from "express";
import authController from "../../controllers/authController";

const router = express.Router();

router.get("/login", authController.loginPage);
router.get("/register", authController.registerPage);
router.get("/reset-password/otp", authController.resetPasswordPage);
router.get("/reset-password/reset/:id", authController.resetPage);
router.post("/auth/change-password/:email", authController.changePassword);
router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/forgot", authController.forgotPassword);
router.post("/auth/otp", authController.verifyOtp);
export default router;
