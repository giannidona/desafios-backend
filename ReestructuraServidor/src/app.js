import dotenv from "dotenv";
dotenv.config();

import express from "express";
import MongoStore from "connect-mongo";
import session from "express-session";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import passport from "passport";
import config from "./config/config.js";
import initializePassport from "./config/passportConfig.js";

import sessionRouter from "./routes/sessionRouter.js";

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL);

const app = express();
const PORT = process.env.PORT || 7070;
app.listen(8080, () => console.log(`Servidor en http://localhost:${PORT}`));

app.use("/static", express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initializePassport();

const SECRET = process.env.SECRET;
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      ttl: 100,
    }),
    secret: SECRET,
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

app.use(sessionRouter);
