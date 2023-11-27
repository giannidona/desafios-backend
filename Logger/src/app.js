import express from "express";
import { logger } from "./utils/logger.js";
import { errors } from "./middlewares/errors.js";

const app = express();
app.use(errors);

app.listen(8080, () => {
  console.log("http://localhost:8080/");
});

app.get("/", (req, res) => {
  res.send("home");
});

app.get("/loggerTest", (req, res) => {
  logger.info("Este es un mensaje de prueba de nivel info.");
  logger.warning("Este es un mensaje de prueba de nivel warning.");
  logger.error("Este es un mensaje de prueba de nivel error.");
  res.send("loggerTest");
});
