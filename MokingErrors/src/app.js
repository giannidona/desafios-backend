import express from "express";

import productsRouter from "./routes/porductsRouter.js";

const app = express();
app.listen(8080, () => console.log("http://localhost:8080/"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("./public"));

app.use(productsRouter);
