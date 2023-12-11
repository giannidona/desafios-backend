import express from "express";
import mongoose from "mongoose";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import userRouter from "./routes/userRouter.js";
import productsRouter from "./routes/productsRouter.js";

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(
  "mongodb+srv://gianlucadonato2005:Mi64zAOScEgphHyG@cluster0.3knqdhm.mongodb.net/?retryWrites=true&w=majority"
);

app.use(express.json());

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

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
