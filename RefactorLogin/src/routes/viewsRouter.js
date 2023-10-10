import { Router } from "express";
import publicRoutes from "../middlewares/publicRoutes.js";
import privateRoutes from "../middlewares/privateRoutes.js";

const router = Router();

router.get("/login", publicRoutes, (req, res) => {
  res.render("login");
});

router.get("/register", publicRoutes, (req, res) => {
  res.render("signup");
});

router.get("/profile", privateRoutes, (req, res) => {
  const { first_name, email } = req.session;
  res.render("profile", { first_name, email });
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/login");
  });
});

router.get("/failregister", (req, res) => res.send("Fallo en registro"));

router.get("/faillogin", (req, res) => res.send("Fallo en login"));

export default router;
