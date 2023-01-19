const mongoose = require("mongoose");

const offersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
    },
    offerImg: {},

    price: {
      type: Number,
      required: true,
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

module.exports = mongoose.model("Offer", offersSchema);
