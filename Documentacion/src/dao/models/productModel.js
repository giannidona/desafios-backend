import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  stock: Number,
  price: Number,
  owner: {
    type: String,
    ref: "users",
  },
});

const productModel = mongoose.model(productCollection, productSchema);
export default productModel;
