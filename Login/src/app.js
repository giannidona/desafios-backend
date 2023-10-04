import express from "express";
import MongoStore from "connect-mongo";
import session from "express-session";
import sessionRouter from "./routes/sessionRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";

const app = express();
app.listen(8080, () => console.log("live on 8080"));

mongoose.connect(
  "mongodb+srv://gianlucadonato2005:Mi64zAOScEgphHyG@cluster0.3knqdhm.mongodb.net/?retryWrites=true&w=majority"
);

app.use("/static", express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://gianlucadonato2005:Mi64zAOScEgphHyG@cluster0.3knqdhm.mongodb.net/?retryWrites=true&w=majority",
      ttl: 100,
    }),
    secret: "oianwinawofinawf",
    resave: false,
    saveUninitialized: false,
  })
);

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use("/api", sessionRouter);
app.use("/api", viewsRouter);
