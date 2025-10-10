import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes.js";
import { sequelize } from "./config/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => res.send("🛫 Booking service running"));

// Sync DB & start server
sequelize.sync({ alter: true }).then(() => {
  const PORT = process.env.PORT || 4003;
  app.listen(PORT, () => console.log(`✅ Booking service running on port ${PORT}`));
});
