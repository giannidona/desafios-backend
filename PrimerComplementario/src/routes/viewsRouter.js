import { Router } from "express";
import ProductManager from "../dao/db/productManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/verProductos", async (req, res) => {
  const prods = await productManager.getAll();
  // console.log(prods);
  res.render("products", { prods });
});

router.get("/chat", (req, res) => res.render("chat", {}));

export default router;
