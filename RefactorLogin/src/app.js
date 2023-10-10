import express from "express";
import MongoStore from "connect-mongo";
import session from "express-session";
import handlebars from "express-handlebars";
import mongoose from "mongoose";

import passport from "passport";
import initializePassport from "./config/passportConfig.js";

import sessionRouter from "./routes/sessionRouter.js";
import viewsRouter from "./routes/viewsRouter.js";

mongoose.connect(
  "mongodb+srv://gianlucadonato2005:Mi64zAOScEgphHyG@cluster0.3knqdhm.mongodb.net/?retryWrites=true&w=majority"
);

const app = express();
app.listen(8080, () => console.log("http://localhost:8080/api/login"));

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

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use("/api", sessionRouter);
app.use("/", viewsRouter);
