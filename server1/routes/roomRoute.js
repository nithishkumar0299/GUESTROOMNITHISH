//it is concept to trigger the room root
const express = require("express");
const router = express.Router();
const controller = require("../controllers/roomController");

router.post("/rooms/createRoom", controller.createRoom);
router.get("/rooms/getAllRooms", controller.getAllRooms);
router.get("/rooms/getOneRoom/:id", controller.getOneRoom);
router.get("/rooms/getRoomsByProperties/:id", controller.getRoomsByProperty);
router.get("/rooms/getAllRoomsByOwner/:id", controller.getAllRoomsByOwner);
router.put("/rooms/editRoom/:id", controller.editRoom);
router.delete("/rooms/deleteRoom/:id", controller.deleteRoom);

module.exports = router;
