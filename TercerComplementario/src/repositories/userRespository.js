import UserDAO from "../dao/mongo/usersMongo.js";
import UserDTO from "../dto/usersDTO.js";

export default class UserRepository {
  static async registerUser(name, email, password) {
    const existingUser = await UserDAO.getUserByEmail(email);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const userDTO = new UserDTO(name, email, password);
    const newUser = await UserDAO.createUser(userDTO);
    return newUser;
  }

  static async loginUser(email, password) {
    const user = await UserDAO.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    return user;
  }
}
