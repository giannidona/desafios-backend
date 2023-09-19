import { productModel } from "../models/productModel.js";

class ProductManager {
  async create(name, stock, descrip, image) {
    const product = await productModel.create({
      name,
      stock,
      descrip,
      image,
    });
    return product;
  }

  async getAll() {
    const products = await productModel.find().lean();
    return products;
  }
}

export default ProductManager;
