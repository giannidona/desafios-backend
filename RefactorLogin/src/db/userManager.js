import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";

class UserManager {
  async createUser(username, email, password) {
    const user = await userModel.create({
      username,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });
    return user;
  }

  async findUser(email, password) {
    const user = await userModel.findOne({ email, password }).lean();
    return user;
  }
}

export default UserManager;
