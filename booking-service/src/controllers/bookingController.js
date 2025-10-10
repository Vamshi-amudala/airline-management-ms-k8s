import { Booking } from "../models/Booking.js";
import axios from "axios";

const USER_SERVICE = process.env.USER_SERVICE_URL;
const FLIGHT_SERVICE = process.env.FLIGHT_SERVICE_URL;
const NOTIFICATION_SERVICE = process.env.NOTIFICATION_SERVICE_URL;

// GET all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// CREATE booking
export const createBooking = async (req, res) => {
  const { flightId, seats } = req.body;
  const userId = req.user.id;

  try {
    // Fetch flight
    const { data: flight } = await axios.get(`${FLIGHT_SERVICE}/api/flights/${flightId}`);
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    // Fetch user
    const { data: user } = await axios.get(`${USER_SERVICE}/users/${userId}`);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Seat allocation
    const existingBookings = await Booking.findAll({ where: { flightId } });
    const bookedSeats = existingBookings.flatMap(b => b.seatNumbers || []);
    const seatNumbers = [];
    let seatIndex = 1;
    while (seatNumbers.length < seats) {
      const seat = `A${seatIndex}`;
      if (!bookedSeats.includes(seat)) seatNumbers.push(seat);
      seatIndex++;
    }

    const booking = await Booking.create({
      userId,
      flightId,
      seats,
      seatNumbers,
      price: seats * flight.price,
      status: "CONFIRMED"
    });

    // Notification
    try {
      await axios.post(`${NOTIFICATION_SERVICE}/api/notifications`, {
        to: user.email,
        subject: "Booking Confirmed ✅",
        message: `Flight booked successfully. Seats: ${seatNumbers.join(", ")}. Booking ID: ${booking.id}`
      });
    } catch (notifyErr) {
      console.error("Notification error:", notifyErr.message);
    }

    res.status(201).json(booking);

  } catch (err) {
    console.error("Booking error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// CANCEL booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.userId !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    booking.status = "CANCELLED";
    await booking.save();

    // Notify
    try {
      const { data: user } = await axios.get(`${USER_SERVICE}/users/${req.user.id}`);
      if (user) {
        await axios.post(`${NOTIFICATION_SERVICE}/api/notifications`, {
          to: user.email,
          subject: "Booking Cancelled ❌",
          message: `Your booking ID ${booking.id} has been cancelled.`
        });
      }
    } catch (notifyErr) {
      console.error("Notification error:", notifyErr.message);
    }

    res.json({ message: "Booking cancelled", booking });

  } catch (err) {
    console.error("Cancel booking error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
