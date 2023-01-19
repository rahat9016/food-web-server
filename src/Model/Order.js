const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    foods: [
      {
        food: {
          type: mongoose.Types.ObjectId,
          refPath: "foods.onModel",
          required: true,
        },
        onModel: {
          type: String,
          required: true,
          enum: ["Food", "Offer"],
        },
        quantity: {
          type: Number,
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
    totalAfterDiscount: {
      type: Number,
    },
    orderBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    paymentIntent: {},
    customerInformation: {
      firstName: String,
      lastName: String,
      number: Number,
      city: String,
      zone: String,
      fullAddress: String,
    },
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Completed",
      ],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
