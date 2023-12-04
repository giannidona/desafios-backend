import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";

async function createProduct(name, description, stock, price, userEmail) {
  try {
    const user = await UserModel.findOne({ email: userEmail });
    if (!user || user.role !== "premium") {
      throw new Error("Solo los usuarios premium pueden crear productos");
    }

    const owner = userEmail || "admin";

    const newProduct = new ProductModel({
      name,
      description,
      stock,
      price,
      owner,
    });

    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw error;
  }
}

export default {
  createProduct,
};
