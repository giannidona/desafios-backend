import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "savannah.bahringer91@ethereal.email",
    pass: "VBfk3FuNqPsXcdQNnp",
  },
});

const users = [
  { email: "savannah.bahringer91@ethereal.email", password: "password123" },
];

router.post("/recover", async (req, res) => {
  const { email } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).send("Correo electrónico no encontrado");
  }

  const message = {
    from: "sender@server.com",
    to: email,
    subject: "Recuperación de contraseña",
    text: `Hola, haz clic en el enlace para restablecer tu contraseña: http://localhost:8080/reset-password`,
    html: `<p>Hola, haz clic <a href="http://localhost:8080/reset-password">aquí</a> para restablecer tu contraseña.</p>`,
  };

  await transporter.sendMail(message);
  res.status(200).send("Correo de recuperación enviado");
});

router.post("/reset-password", (req, res) => {
  const { email, newPassword } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).send("Correo electrónico no encontrado");
  }

  user.password = newPassword;

  res.status(200).send("Contraseña restablecida con éxito");
});

export default router;
