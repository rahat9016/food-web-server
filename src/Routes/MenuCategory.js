const express = require("express");
const {
  menuCreate,
  getMenu,
  updateMenu,
  deleteMenu,
} = require("../Controllers/MenuCategory");
const router = express.Router();

router.post("/menu", menuCreate);
router.get("/menu", getMenu);
router.put("/menu/:id", updateMenu);
router.delete("/menu/:id", deleteMenu);

module.exports = router;
