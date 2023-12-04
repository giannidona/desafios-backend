import express from "express";
import config from "./config/config.js";
import mongoose from "mongoose";

import sessionRouter from "./routes/sessionRouter.js";
import revcoverpasswordRouter from "./routes/recoverpasswordRouter.js";

const app = express();
app.listen(config.PORT, () => console.log(`http://localhost:${config.PORT}/`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(config.MongoURL);

app.use(sessionRouter);
app.use(revcoverpasswordRouter);
