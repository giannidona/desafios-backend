import { Router } from "express";
import UserRepository from "../repositories/userRespository.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await UserRepository.registerUser(name, email, password);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserRepository.loginUser(email, password);
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
