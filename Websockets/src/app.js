import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/viewsRouter.js";
import productRouter from "./routes/productRouter.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = app.listen(8080, () => console.log("live on 8080"));
const socketServer = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "\\views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "\\public"));

app.use((req, res, next) => {
  req.context = { socketServer };
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", viewsRouter);
app.use("/api/products", productRouter);

const newProduct = [];

socketServer.on("connection", (socket) => {
  console.log(`Se conectó el usuario con socket id: ${socket.id}`);

  socket.on("product", (data) => {
    newProduct.push({ socketid: socket.id, product: data });
    socketServer.emit("product", newProduct);
  });
});
