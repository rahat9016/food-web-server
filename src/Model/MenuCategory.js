const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: [2, "Too short"],
      maxlength: [32, "Too Long"],
    },
    slug: {
      type: String,
      unique: true,
    },
    menuImage: {},
    createBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
