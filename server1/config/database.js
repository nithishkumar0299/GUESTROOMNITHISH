//it is initalized Mandodb
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.db_url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((con) => {
      console.log(`MongoDB connected to the host ${con.connection.host}`);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
