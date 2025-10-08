import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import flightRoutes from "./routes/flightRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/flights", flightRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`✈️ Flight service running on port ${PORT}`));
