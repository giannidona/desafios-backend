import { Router } from "express";
import { uploader } from "../middlewares/multer.js";
import ProductManager from "../dao/db/productManager.js";

const router = Router();
const productManager = new ProductManager();

router.post("/", uploader.single("file"), async (req, res) => {
  const { name, stock, descrip } = req.body;
  const image = req.file.originalname;
  const prod = await productManager.create(name, stock, descrip, image);
  res.status(200).send(prod);
});

export default router;
