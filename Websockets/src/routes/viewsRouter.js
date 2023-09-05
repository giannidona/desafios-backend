import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();
const productManager = new ProductManager("./src/products.json");

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("realtimeproducts", { products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos en tiempo real");
  }
});

router.get("/addproduct", (req, res) => {
  res.render("addProduct");
});

router.post("/addproduct", async (req, res) => {
  try {
    const { title, description, img, price, code, stock } = req.body;
    await productManager.addProduct(
      title,
      description,
      img,
      price,
      code,
      stock
    );

    req.context.socketServer.emit("productAdded", req.body);

    res.redirect("/addproduct");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al agregar el producto");
  }
});

router.get("/delete", (req, res) => {
  res.render("deleteProduct");
});

router.post("/delete", async (req, res) => {
  try {
    const productId = parseInt(req.body.productId);

    await productManager.deleteProductById(productId);

    res.redirect("/delete");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el producto");
  }
});

export default router;
