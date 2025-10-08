import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));
