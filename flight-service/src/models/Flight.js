import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Flight = sequelize.define("Flight", {
  airlineName: { type: DataTypes.STRING, allowNull: false },
  source: { type: DataTypes.STRING, allowNull: false },
  destination: { type: DataTypes.STRING, allowNull: false },
  departureTime: { type: DataTypes.DATE, allowNull: false },
  arrivalTime: { type: DataTypes.DATE, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  seatsAvailable: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 100 },
});
