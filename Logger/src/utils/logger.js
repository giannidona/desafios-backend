import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const environment = process.env.environment;

const cfg = {
  dev: {
    transports: [
      new winston.transports.Console({
        level: "debug",
      }),
    ],
  },
  prod: {
    transports: [
      new winston.transports.Console({
        level: "info",
      }),
      new winston.transports.File({
        filename: "errors.log",
        level: "error",
      }),
    ],
  },
};

export const logger = winston.createLogger({
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  transports: cfg[environment].transports,
});
