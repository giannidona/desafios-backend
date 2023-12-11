import { productService } from "../services/services.js";

const getAllProducts = async (req, res) => {
  const products = await productService.getAll();
  res.send({ status: "success", payload: products });
};

const getById = async (req, res) => {
  const prodId = req.param.prodId;
  const product = await productService.getById({ _id: prodId });
  res.send({ status: "success", payload: product });
};

export default { getAllProducts, getById };
