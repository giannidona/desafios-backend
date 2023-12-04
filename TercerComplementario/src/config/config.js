import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 2020,
  MongoURL: process.env.MongoURL,
};
