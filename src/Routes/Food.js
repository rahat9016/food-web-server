const express = require("express");
const { requireSigning, adminMiddleware } = require("../Common/AuthGuard");
const upload = require("../Common/multer");
const {
  foodCreate,
  foodGet,
  foodUpdate,
  foodDelete,
  foodsList,
} = require("../Controllers/Food");
const router = express.Router();

router.post(
  "/food",
  requireSigning,
  adminMiddleware,
  upload.array("foodImages"),
  foodCreate
);
router.get("/food", foodGet);
router.post("/foods", foodsList);
router.put("/food", requireSigning, adminMiddleware, foodUpdate);
router.delete("/food", requireSigning, adminMiddleware, foodDelete);

module.exports = router;
