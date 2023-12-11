import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getById);

export default router;
