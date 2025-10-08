import Booking from "../models/Booking.js";
import User from "../models/User.js"; // Shared User model
import axios from "axios";

// Get all bookings
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.json(bookings);
    } catch (err) {
        console.error("Error fetching bookings:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Create a new booking
export const createBooking = async (req, res) => {
    const { flightId, seats } = req.body;
    const userId = req.user.id; // From JWT

    try {
        // Fetch flight details
        const flightResp = await axios.get(`http://localhost:4001/api/flights/${flightId}`);
        const flight = flightResp.data;
        if (!flight) return res.status(404).json({ message: "Flight not found" });

        // Fetch user email from shared DB
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Get existing bookings for this flight
        const existingBookings = await Booking.findAll({ where: { flightId } });
        const bookedSeats = existingBookings.flatMap(b => b.seatNumbers || []);

        // Assign next available seats
        const seatNumbers = [];
        let seatIndex = 1;
        while (seatNumbers.length < seats) {
            const seat = `A${seatIndex}`;
            if (!bookedSeats.includes(seat)) seatNumbers.push(seat);
            seatIndex++;
        }

        // Create booking
        const booking = await Booking.create({
            userId,
            flightId,
            seats,
            seatNumbers,
            price: seats * flight.price,
            status: "CONFIRMED"
        });

        // Send booking confirmation email
        try {
            await axios.post("http://localhost:4004/api/notifications", {
                to: user.email,
                subject: "Booking Confirmed ✅",
                message: `Your flight ${flight.flightNumber} has been booked successfully. Seats: ${seatNumbers.join(", ")}. Booking ID: ${booking.id}`
            });
        } catch (emailErr) {
            console.error("Failed to send booking notification:", emailErr.message);
        }

        res.status(201).json(booking);

    } catch (err) {
        console.error("Booking creation error:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        // Check ownership
        if (booking.userId !== req.user.id) {
            return res.status(403).json({ message: "You can only cancel your own bookings" });
        }

        booking.status = "CANCELLED";
        await booking.save();

        // Send cancellation email
        try {
            const user = await User.findByPk(req.user.id);
            if (user) {
                await axios.post("http://localhost:4004/api/notifications", {
                    to: user.email,
                    subject: "Booking Cancelled ❌",
                    message: `Your booking ID ${booking.id} has been cancelled successfully.`
                });
            }
        } catch (emailErr) {
            console.error("Failed to send cancellation notification:", emailErr.message);
        }

        res.json({
            message: "Booking cancelled successfully",
            booking
        });

    } catch (err) {
        console.error("Cancel booking error:", err.message);
        res.status(500).json({ message: err.message });
    }
};
