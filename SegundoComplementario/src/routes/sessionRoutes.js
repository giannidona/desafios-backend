import { Router } from "express";
import passport from "passport";
import { userModel } from "../dao/models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userLoad from "../middlewares/userLoad.js";

const router = Router();

router.post(
  "/signup",
  passport.authenticate("register", { failureRedirect: "/algosaliomal" }),
  async (req, res) => {
    console.log(req.user);
    res.redirect("/login");
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  console.log(user);
  if (!user) {
    return res.status(401).send("la cuenta no existe");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).send("contraseña incorrecta");
  }

  const userId = user._id;
  const token = jwt.sign({ userId }, "secreto", { expiresIn: "24h" });

  res
    .cookie("token", token, {
      maxAge: 1000000,
      httpOnly: true,
    })
    .send("Estás logeado");
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  userLoad,
  async (req, res) => {
    res.send(req.user);
  }
);

router.get("/formlogin", (req, res) => res.render("login"));
export default router;
