import { Flight } from "../models/Flight.js";

// GET all flights
export const getFlights = async (req, res) => {
  try {
    const flights = await Flight.findAll();
    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching flights" });
  }
};

// GET flight by ID
export const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json(flight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching flight" });
  }
};

// POST a new flight
export const addFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding flight" });
  }
};

// PUT/PATCH update flight
export const updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    await flight.update(req.body);
    res.json(flight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating flight" });
  }
};

// DELETE flight
export const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    await flight.destroy();
    res.json({ message: "Flight deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting flight" });
  }
};
