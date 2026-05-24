const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Add this line
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Entrepreneur", "Investor"],
    default: "Entrepreneur",
  },
});

module.exports = mongoose.model("User", UserSchema);
