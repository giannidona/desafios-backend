import UserModel from "../models/usersModel.js";

export default class UserDAO {
  static async createUser(userDTO) {
    try {
      const user = new UserModel(userDTO);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  static async getUserByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      throw new Error(`Error getting user by email: ${error.message}`);
    }
  }
}
