import express from "express";
import collectionsController from "../../controllers/collectionsController";
const router = express.Router();

router.get("/collections/:id", collectionsController.index);

export default router;
