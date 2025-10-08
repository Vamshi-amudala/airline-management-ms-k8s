import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"; // make sure path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

// Mount user routes
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("User service running");
});

app.listen(PORT, () => {
  console.log(`👤 User service running on port ${PORT}`);
});
