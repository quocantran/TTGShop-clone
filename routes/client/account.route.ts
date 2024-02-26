import express from "express";
import accountController from "../../controllers/accountController";
import authMiddleware from "../../middleware/authMiddleware";
const router = express.Router();

router.get("/", authMiddleware.verifyToken, accountController.index);


export default router;
