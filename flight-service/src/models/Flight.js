import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Flight = sequelize.define("Flight", {
  airlineName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false
  },
  departureTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  arrivalTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});
