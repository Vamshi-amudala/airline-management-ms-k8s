import express from "express";
import {
  getFlights,
  addFlight,
  updateFlight,
  deleteFlight,
  getFlightById,
} from "../controllers/flightController.js";

import { authenticateToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getFlights);
router.get("/:id", getFlightById);

// Admin-only routes
router.post("/", authenticateToken, isAdmin, addFlight);
router.put("/:id", authenticateToken, isAdmin, updateFlight);   // Full update
router.patch("/:id", authenticateToken, isAdmin, updateFlight); // Partial update
router.delete("/:id", authenticateToken, isAdmin, deleteFlight);

export default router;
