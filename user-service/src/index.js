import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

app.get("/", (req, res) => res.send("👤 User service running"));

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`✅ User service on port ${PORT}`));
});
