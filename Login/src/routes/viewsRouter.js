import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
  if (req.session.isLogged) {
    return res.redirect("/api/profile");
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.isLogged) {
    return res.redirect("/api/profile");
  }

  res.render("signup");
});

router.get("/profile", (req, res) => {
  if (!req.session.isLogged) {
    return res.redirect("/api/login");
  }

  const { username, email, image } = req.session;
  // console.log(req.session);
  const isAdmin = req.session.admin || false;

  res.render("profile", {
    username,
    email,
    image,
    admin: isAdmin,
  });
});

export default router;
