//it is concept to trigger the booking root
const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookingController");

router.post("/booking/createBooking", controller.createBooking);

router.get("/booking/getRoomBookings/:roomId", controller.getRoomBookings);

router.delete("/booking/cancelBooking/:bookingId", controller.cancelBooking);

router.get(
  "/booking/getBookedRoomsByCustomer/:customerId",
  controller.getBookedRoomsByCustomer
);

router.post("/booking/checkAvaiability", controller.checkAvailability);

module.exports = router;
