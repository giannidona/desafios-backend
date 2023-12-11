import productModel from "./models/productModel.js";

export default class productDAO {
  get = (params) => {
    return productModel.find(params);
  };

  getBy = (params) => {
    return productModel.findOne(params);
  };

  save = (doc) => {
    return productModel.create(doc);
  };
}
