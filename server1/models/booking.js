//room booking connections on client to server
const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
},{
  timestamps:true
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
