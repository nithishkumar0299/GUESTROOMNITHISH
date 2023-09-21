//back end setup to store data on colud
const Room = require("../models/rooms");
const Booking = require("../models/booking");

const getRoomBookings = async (req, res) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      return res.status(400).json({ message: "Room ID is required" });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const bookings = await Booking.find({ room: roomId });
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const createBooking = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, customerId } = req.body;

    if (!roomId || !checkInDate || !checkOutDate || !customerId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const existingBooking = await Booking.findOne({
      room: roomId,
      $or: [
        {
          checkInDate: { $lte: checkInDate },
          checkOutDate: { $gte: checkInDate },
        },
        {
          checkInDate: { $lte: checkOutDate },
          checkOutDate: { $gte: checkOutDate },
        },
      ],
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "Room is already booked for the selected dates" });
    }

    const booking = await Booking.create({
      room: roomId,
      checkInDate,
      checkOutDate,
      customer: customerId,
    });
    res.status(201).json(booking);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const checkAvailability = async (req, res) => {
  try {
    const { roomId = "", checkInDate = "", checkOutDate = "" } = req.body || {};

    if (!roomId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const existingBooking = await Booking.findOne({
      room: roomId,
      $or: [
        {
          checkInDate: { $lte: checkInDate },
          checkOutDate: { $gte: checkInDate },
        },
        {
          checkInDate: { $lte: checkOutDate },
          checkOutDate: { $gte: checkOutDate },
        },
      ],
    });

    if (existingBooking) {
      return res.status(200).json({
        message: "Room is already booked for the selected dates",
        available: false,
      });
    } else {
      return res.status(200).json({
        message: "Room is vacant for the selected dates",
        available: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    if (!bookingId) {
      return res.status(400).json({ message: "Booking ID is required" });
    }
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await Booking.findByIdAndRemove(bookingId);

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getBookedRoomsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    const bookings = await Booking.find({ customer: customerId });
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createBooking,
  getRoomBookings,
  cancelBooking,
  getBookedRoomsByCustomer,
  checkAvailability,
};
