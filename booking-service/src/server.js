import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 4003;

sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Booking Service running on port ${PORT}`));
  })
  .catch(err => console.error("DB sync error:", err));

