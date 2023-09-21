//it is concept to trigger the user root
const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/user", controller.getAllUsers);
router.get("/user/profile/:id", controller.profile);
router.post("/user/createUser", controller.createUser);
router.put("/user/updateUser/:id", controller.editUser);
router.delete("/user/deleteUser/:id", controller.deleteUser);
router.post("/user/login", controller.login);

module.exports = router;
