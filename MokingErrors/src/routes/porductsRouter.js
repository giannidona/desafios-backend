import { Router } from "express";
import { ProductController } from "../controllers/productController.js";

const productController = new ProductController();

const router = Router();

router.get("/mokingproducts", productController.execute);

export default router;
