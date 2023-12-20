import { Router } from "express";
import cartController from "../controllers/cartController.js";

const router = Router();

router.get("/cart", cartController.renderCart);

router.post("/cart/:productId", cartController.addToCart);

export default router;
