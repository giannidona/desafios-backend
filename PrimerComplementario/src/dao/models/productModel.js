import mongoose from "mongoose";

const prodCollection = "products";

const prodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  descrip: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model(prodCollection, prodSchema);
export { productModel };
