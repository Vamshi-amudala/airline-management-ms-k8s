import Booking from "../models/Booking.js";
import axios from "axios";

// Get all bookings
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new booking
export const createBooking = async (req, res) => {
    const { flightId, seats } = req.body; // <-- remove userId from body
    const userId = req.user.id; // <-- get userId from JWT

    try {
        // Fetch flight details
        const flightResp = await axios.get(`http://localhost:4001/api/flights/${flightId}`);
        const flight = flightResp.data;

        if (!flight) return res.status(404).json({ message: "Flight not found" });

        // const price = seats * flight.price;

const existingBookings = await Booking.findAll({ where: { flightId } });

// Flatten already booked seats
const bookedSeats = existingBookings.flatMap(b => b.seatNumbers || []);

// Assign next available seats
const seatNumbers = [];
let seatIndex = 1;

while (seatNumbers.length < seats) {
    const seat = `A${seatIndex}`;
    if (!bookedSeats.includes(seat)) {
        seatNumbers.push(seat);
    }
    seatIndex++;
}

// Create booking
const booking = await Booking.create({
    userId,
    flightId,
    seats,
    seatNumbers,
    price: seats * flight.price
});
        res.status(201).json(booking);
    } catch (err) {
        console.error("Booking creation error:", err.message);
        res.status(500).json({ message: err.message });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Optional: check if the booking belongs to the logged-in user
        if (booking.userId !== req.user.id) {
            return res.status(403).json({ message: "You can only cancel your own bookings" });
        }

        booking.status = "CANCELLED";
        await booking.save();

        // Optionally, you could clear seatNumbers so they are free for others
        // booking.seatNumbers = null;
        // await booking.save();

        res.json({
            message: "Booking cancelled successfully",
            booking
        });
    } catch (err) {
        console.error("Cancel booking error:", err.message);
        res.status(500).json({ message: err.message });
    }
};