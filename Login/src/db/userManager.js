import { userModel } from "../models/userModel.js";

class UserManager {
  async createUser(username, email, password, image) {
    const user = await userModel.create({
      username,
      email,
      password,
      image,
    });
    return user;
  }

  async findUser(username, password) {
    const user = await userModel.findOne({ username, password }).lean();
    return user;
  }
}

export default UserManager;
