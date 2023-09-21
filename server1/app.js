//database setup on express js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));

const users = require("./routes/userRoute");
const property = require("./routes/propertyRoute");
const room = require("./routes/roomRoute");
const booking = require("./routes/bookingRoute");

app.use("/api/v1", users);
app.use("/api/v1", property);
app.use("/api/v1", room);
app.use("/api/v1", booking);

module.exports = app;
