import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Booking = sequelize.define("Booking", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  flightId: { type: DataTypes.INTEGER, allowNull: false },
  seats: { type: DataTypes.INTEGER, allowNull: false },
  seatNumbers: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  price: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.ENUM("CONFIRMED", "CANCELLED"), defaultValue: "CONFIRMED" },
});
