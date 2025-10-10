import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const sslOptions = process.env.DB_SSL === "true"
  ? { rejectUnauthorized: true, ca: fs.readFileSync("./src/config/certs/ca.crt").toString() }
  : false;

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: process.env.DB_SSL === "true" ? { ssl: sslOptions } : {},
    logging: false,
  }
);
