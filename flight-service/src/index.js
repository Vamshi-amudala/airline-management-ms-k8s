import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import flightRoutes from "./routes/flightRoutes.js";
import { sequelize } from "./config/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/flights", flightRoutes);

app.get("/", (req, res) => res.send("✈️ Flight service running"));

// Sync DB and start server
sequelize.sync({ alter: true }).then(() => {
  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () =>
    console.log(`✅ Flight service running on port ${PORT}`)
  );
});
