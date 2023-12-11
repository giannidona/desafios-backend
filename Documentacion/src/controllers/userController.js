import { usersService } from "../services/services.js";

const getAllUsers = async (req, res) => {
  const users = await usersService.getAll();
  res.send({ status: "success", payload: users });
};

const getById = async (req, res) => {
  const userId = req.param.userId;
  const user = await usersService.getById({ _id: userId });
  res.send({ status: "success", payload: user });
};

export default { getAllUsers, getById };
