//database connection for room list
const Room = require("../models/rooms");
const Property = require("../models/property");
const mongoose = require("mongoose");
const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    console.log("Creating New Property");

    res.status(200).json(room);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const room = await Room.find({});
    console.log("Fetching all rooms");
    res.status(200).json(room);
    console.log("Fetching all rooms succesful");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getOneRoom = async (req, res) => {
  try {
    const { id } = req.params || {};
    console.log("Getting Room By Id");
    const room = await Room.findById(id);
    res.status(200).json(room);
    console.log("Room Found Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const editRoom = async (req, res) => {
  try {
    const { id } = req.params; // Use req.params to get the id from the URL
    console.log("Updating Room Started...");
    const room = await Room.findByIdAndUpdate(id, req.body, { new: true }); // Update the room with the provided id and request body
    console.log("Room updated Successfully");
    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params || "";
    console.log("Deleting Room Started...");
    const room = await Room.findByIdAndDelete(id);
    res.status(200).json(room);
    console.log("Room updated Succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getRoomsByProperty = async (req, res) => {
  try {
    const { id = "" } = req.params || {};
    const propertyId = id;
    if (!propertyId || typeof propertyId !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid or missing Property Id" });
    }
    const { ObjectId } = mongoose.Types;
    if (!ObjectId.isValid(propertyId)) {
      return res.status(400).json({ message: "Invalid Property Id format" });
    }
    const id1 = new ObjectId(propertyId);
    const rooms = await Room.find({ property: id1 });
    if (rooms.length === 0) {
      return res
        .status(404)
        .json({ message: "No rooms found for the specified property" });
    }

    res.status(200).json({
      status: "success",
      data: rooms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllRoomsByOwner = async (req, res) => {
  try {
    const { id = "" } = req.params || {};
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid ObjectId format for ownerId" });
    }
    const properties = await Property.find({ owner: id }).exec();
    const propertyIds = properties.map((property) => property._id);
    const rooms = await Room.find({ property: { $in: propertyIds } }).exec();
    res.status(200).json({ rooms });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  editRoom,
  deleteRoom,
  getOneRoom,
  getRoomsByProperty,
  getAllRoomsByOwner,
};
