import { Router } from "express";
import { uploader } from "../middlewares/multer.js";
import UserManager from "../db/userManager.js";

const router = Router();
const userManager = new UserManager();

router.post("/login", async (req, res) => {
  if (req.session.isLogged) {
    return res.redirect("/api/profile");
  }

  try {
    const { username, password } = req.body;
    const user = await userManager.findUser(username, password);

    if (!user) {
      return res.redirect("/api/login");
    }

    req.session.username = user.username;
    req.session.email = user.email;
    req.session.image = user.image;
    req.session.isLogged = true;

    if (user.username === "coder" && user.password === "123") {
      req.session.admin = true;
    } else {
      req.session.admin = false;
    }

    res.redirect("/api/profile");
  } catch (error) {
    res.send(error);
  }
});

router.post("/signup", uploader.single("image"), async (req, res) => {
  if (req.session.isLogged) {
    return res.redirect("/api/profile");
  }

  try {
    const { username, email, password } = req.body;
    const image = req.file.originalname;
    const user = await userManager.createUser(username, email, password, image);
    res.status(200).send(user);

    res.redirect("/api/profile");
  } catch (error) {
    res.send(error);
  }
});

export default router;
