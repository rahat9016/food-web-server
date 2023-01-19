const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 32,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "admin",
    },
    mobile: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    zone: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
