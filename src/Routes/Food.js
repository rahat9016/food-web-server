const express = require("express");
const upload = require("../Common/multer");
const {
  foodCreate,
  foodGet,
  foodUpdate,
  foodDelete,
} = require("../Controllers/Food");
const router = express.Router();

router.post("/food", upload.array("foodImages"), foodCreate);
router.get("/food", foodGet);
router.put("/food", foodUpdate);
router.delete("/food", foodDelete);

module.exports = router;
