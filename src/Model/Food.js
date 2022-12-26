const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    foodImg: [
      {
        url: {
          type: String,
        },
        id: {
          type: String,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },

    menuId: {
      type: mongoose.Types.ObjectId,
      ref: "Menu",
    },
    reviews: [
      {
        postedBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        star: Number,
        comment: String,
      },
    ],
    shipping: {
      type: String,
      enum: ["yes", "no"],
      default: "yes",
    },
    createBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
