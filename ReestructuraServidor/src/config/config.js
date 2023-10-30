import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  mongoURL: process.env.MONGO_URL,
  secret: process.env.SECRET,
};
