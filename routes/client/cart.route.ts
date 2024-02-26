import express from "express";
import cartController from "../../controllers/cartController";

const router = express.Router();

router.get("/cart", cartController.cartPage);
router.post("/add-to-cart/:id", cartController.addToCart);
router.post("/remove/:id", cartController.removeProduct);

export default router;
