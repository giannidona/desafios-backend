import { Router } from "express";
import productController from "../controllers/productController.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:prodId", productController.getById);

export default router;
