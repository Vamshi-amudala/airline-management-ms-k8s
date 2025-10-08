import express from "express";
import { getBookings, createBooking, cancelBooking } from "../controllers/bookingController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, getBookings);
router.post("/", authenticateToken, createBooking);
router.put("/cancel/:id", authenticateToken, cancelBooking);

export default router;
