import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import session from "express-session";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import { loggerHttp } from "./utils/logger.js";

import sessionsRouter from "./routes/sessionsRouter.js";
import homeRouter from "./routes/homeRouter.js";
import createProductRouter from "./routes/createProduct.js";
import cartRouter from "./routes/cartRouter.js";
import ticketRouter from "./routes/ticketRouter.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET;

const app = express();
const httpServer = app.listen(PORT || 2020, () =>
  console.log(`http://localhost:${PORT}/login`)
);

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",

    info: {
      title: "Documentazao",
      description: "Documentación",
    },
  },

  apis: [`./src/docs/**.yaml`],
};

const specs = swaggerJsdoc(swaggerOptions);

mongoose.connect(MONGO_URL);

app.use("/static", express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      ttl: 2 * 60,
    }),
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(loggerHttp);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use(sessionsRouter);
app.use(homeRouter);
app.use(createProductRouter);
app.use(cartRouter);
app.use(ticketRouter);
