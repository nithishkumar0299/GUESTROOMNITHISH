//room data with variable check if it true or false
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  floorSize: {
    type: Number,
    required: true,
  },
  numberOfBeds: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    default: [],
  },
  rentAmountPerDay: {
    type: Number,
    required: true,
  },
  roomType: {
    type: String,
  },
  photos: {
    type: [String],
    default: [],
  },
  status: {
    type: Boolean,
    default: true,
  },
},{
  timestamps:true
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
