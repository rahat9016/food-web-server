const express = require("express");
const { requireSigning, adminMiddleware } = require("../Common/AuthGuard");
const upload = require("../Common/multer");
const { offerCreate, getOffers } = require("../Controllers/Offer");
const router = express.Router();

router.post(
  "/offers",
  requireSigning,
  adminMiddleware,
  upload.single("offerImg"),
  offerCreate
);
router.get("/offers", getOffers);
module.exports = router;
