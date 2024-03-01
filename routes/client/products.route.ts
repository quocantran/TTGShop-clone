import express from "express";
import productController from "../../controllers/productController";
const router = express.Router();

router.get("/products/:id", productController.index);
router.get("/search", productController.search);
router.get("/api/products", productController.loadMoreProduct);
router.post("/api/suggest-product", productController.suggestProduct);
router.get("/api/product/:id",productController.getProduct);

export default router;
