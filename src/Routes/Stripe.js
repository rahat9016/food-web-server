const express = require("express");
const { userMiddleware, requireSigning } = require("../Common/AuthGuard");
const {
  createPayment,
  updatePaymentInOrder,
} = require("../Controllers/Stripe");
const router = express.Router();

router.post("/payment", requireSigning, userMiddleware, createPayment);
router.put("/payment", requireSigning, userMiddleware, updatePaymentInOrder);

module.exports = router;
