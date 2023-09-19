import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from "socket.io";

import productsRouter from "./routes/productsRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import cartRouter from "./routes/cartRouter.js";

import mensajeModel from "./dao/models/messageModel.js";

mongoose.connect(
  "mongodb+srv://gianlucadonato2005:Mi64zAOScEgphHyG@cluster0.3knqdhm.mongodb.net/?retryWrites=true&w=majority"
);

const app = express();
const httpServer = app.listen(8080, () => console.log("live on 8080"));
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use("/static", express.static("./public"));
app.use(viewsRouter);
app.use("/products", productsRouter);
app.use("/api", cartRouter);

socketServer.on("connection", (socket) => {
  console.log("se conecto", socket.id);
  socket.on("mensaje", async (data) => {
    await mensajeModel.create(data);
    const mensajes = await mensajeModel.find().lean();
    socketServer.emit("nuevo_mensaje", mensajes);
  });
});
