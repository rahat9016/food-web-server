const express = require("express");
const { signup, signing } = require("../Controllers/Auth");
const {
  validateSignupRequest,
  isRequestValidate,
  validateSigningRequest,
} = require("../Validator/User");
const router = express.Router();

router.post("/user/signup", validateSignupRequest, isRequestValidate, signup);
router.post(
  "/user/signing",
  validateSigningRequest,
  isRequestValidate,
  signing
);

module.exports = router;
