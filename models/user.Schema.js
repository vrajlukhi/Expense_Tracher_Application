const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

let userModel = mongoose.model("User", userSchema);

module.exports = userModel;