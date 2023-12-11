import userModel from "./models/userModel.js";

export default class UserDAO {
  get = (params) => {
    return userModel.find(params);
  };

  getBy = (params) => {
    return userModel.findOne(params);
  };

  save = (doc) => {
    return userModel.create(doc);
  };
}
