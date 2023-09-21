//it is concept to trigger the property root
const express = require("express");
const router = express.Router();
const controller = require("../controllers/propertyController");

router.post("/property/createProperty", controller.createProperty);
router.get("/property/getAllProperty", controller.getAllProperty);
router.put("/property/editProperty/:id", controller.editProperty);
router.get("/property/getPropertyByOwner/:id", controller.getPropertyByOwner);
router.post(
  "/property/createPropertyWithRooms",
  controller.createPropertyWithRooms
);

module.exports = router;
