import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Booking = sequelize.define("Booking", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  flightId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seats: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seatNumbers: {
    type: DataTypes.ARRAY(DataTypes.STRING), // stores multiple seat numbers
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "CONFIRMED"
  }
});

export default Booking;
