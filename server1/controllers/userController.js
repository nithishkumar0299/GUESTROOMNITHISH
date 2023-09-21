//database for user to login 
const Users = require("../models/users");

const createUser = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      role = "",
      phone = "",
      email = "",
      password = "",
      loggedIn = false,
      lastLogin = "",
    } = req.body || {};
    if (!firstName || !lastName || !role || !phone || !email || !password)
      return res.status(400).json({ message: "Required fields missing" });
    const data = {
      firstName,
      lastName,
      role,
      phone,
      email,
      password,
      loggedIn,
      lastLogin,
    };
    const user = await Users.create(data);
    console.log("Creating User Account");
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await Users.find({});
    console.log("Getting User Details");
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id is misssing" });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    console.log("Updating User Details");
    const user = await Users.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params || {};
    if (!id) return res.status(400).json({ message: "Id is misssing" });
    console.log("Deleting User");
    const user = await Users.findByIdAndDelete(id);
    console.log(user, "Deleted Successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }
    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Incorrect password." });
    }
    user.lastLogin = new Date();
    user.loggedIn = true;
    await user.save();
    res.status(200).json({ message: "Authentication successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    const { id } = req.params || {};
    const user = await Users.findByIdAndUpdate(id);
    user.loggedIn = true;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const { id } = req.params || {};
    const user = await Users.findById(id);
    if(user){
      return res.status(200).json({success:true,data:user,message:"Your profile has been fetched successfully."})
    }
    else{
      return res.status(404).json({success:true,message:"Your profile does not exist."})

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  editUser,
  deleteUser,
  login,
  logout,
  profile
};
