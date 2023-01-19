const express = require("express");
const { requireSigning, userMiddleware } = require("../Common/AuthGuard");
const { createOrder, getOrder } = require("../Controllers/Order");
const router = express.Router();

router.post("/order", requireSigning, userMiddleware, createOrder);
// router.post("/order", createOrder);
router.get("/order", requireSigning, userMiddleware, getOrder);
// router.get("/order", getOrder);

module.exports = router;
