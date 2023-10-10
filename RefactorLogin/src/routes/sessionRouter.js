import { Router } from "express";
import UserManager from "../db/userManager.js";
import passport from "passport";

const router = Router();
const userManager = new UserManager();

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    req.session.first_name = req.user.first_name;
    req.session.email = req.user.email;
    req.session.isLogged = true;

    res.redirect("/profile");
  }
);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    console.log(req.user);
    res.redirect("/api/login");
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    const { first_name, email } = req.user; // Obtén el first_name y email del usuario
    req.session.first_name = first_name; // Almacena el first_name en la sesión
    req.session.email = email; // Almacena el email en la sesión
    req.session.isLogged = true;
    res.redirect("/profile");
  }
);

export default router;
