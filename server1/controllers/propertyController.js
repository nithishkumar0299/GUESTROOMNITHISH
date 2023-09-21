//back end setup to store data on colud with customer details
const Property = require("../models/property");
const Room = require("../models/rooms");
const User = require("../models/users");

const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    console.log("Creating New Property");
    res.status(200).json(property);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const createPropertyWithRooms = async (req, res) => {
  try {
    const {
      hotelName = "",
      location = "",
      city = "",
      state = "",
      roomImage="",
    } = req.body || {};
    const { ownerId = "6508669e113983b850542cae" } = req.body || {};

    // Validate owner existence
    const ownerExists = await User.findById(ownerId);
    if (!ownerExists) {
      return res.status(400).json({ message: "Invalid owner ID" });
    }

    // Validate property data
    const property = new Property({
      owner: ownerId,
      propertyName: hotelName,
      streetAddress: location,
      city: city,
      state: state,
      roomImage:roomImage,
    });

    const propertyValidationErrors = property.validateSync();
    if (propertyValidationErrors) {
      const validationMessages = Object.values(
        propertyValidationErrors.errors
      ).map((error) => error.message);
      return res.status(400).json({
        message: "Property validation failed",
        errors: validationMessages,
      });
    }

    const rooms = req.body.rooms;

    if (!Array.isArray(rooms) || rooms.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one room must be provided" });
    }

    // Validate each room
    const roomValidationErrors = [];
    for (const roomData of rooms) {
      const room = new Room({
        property: property._id,
        ...roomData,
      });

      const roomValidation = room.validateSync();
      if (roomValidation) {
        roomValidationErrors.push(
          Object.values(roomValidation.errors).map((error) => error.message)
        );
      }
    }

    if (roomValidationErrors.length > 0) {
      return res.status(400).json({
        message: "Room validation failed",
        errors: roomValidationErrors,
      });
    }

    // Create property and rooms
    const savedProperty = await property.save();
    const createdRooms = await Room.insertMany(
      rooms.map((room) => ({
        property: savedProperty._id,
        ...room,
      }))
    );

    savedProperty.rooms = createdRooms.map((room) => room._id);
    await savedProperty.save();

    console.log("Hotel created successfully:", savedProperty);
    console.log("created Rooms successfully:", createdRooms);

    createdRooms;
    res.status(200).json({ savedProperty, createdRooms });
  } catch (error) {
    console.error("Error creating hotel:", error);
    res.status(500).json({ message: error.message });
  }
};

const editProperty = async (req, res) => {
  try {
    console.log("Updating property Started...");
    const property = await Property.findByIdAndUpdate(id, req.body);
    res.status(200).json(property);
    if (property) {
      console.log("Property updated sucessfully");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllProperty = async (req, res) => {
  try {
    console.log("Fetching property Started");
    const property = await Property.find({});
    res.status(200).json(property);
    if (property) {
      console.log("Fetched all properties successfully");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getPropertyByOwner = async (req, res) => {
  try {
    const ownerId = req.params.id || "650b3304da3dd50b770a46f8";
    console.log("Fetching properties for owner:", ownerId);
    const properties = await Property.find({ owner: ownerId });
    if (!properties?.length) {
      return res
        .status(404)
        .json({ message: "No properties found for this owner" });
    }
    if (properties.length === 0) {
      console.log("No properties found for owner:", ownerId);
      return res
        .status(404)
        .json({ message: "No properties found for this owner" });
    }
    console.log("Fetched properties successfully");
    res.status(200).json(properties);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProperty,
  editProperty,
  getAllProperty,
  getPropertyByOwner,
  createPropertyWithRooms,
};
