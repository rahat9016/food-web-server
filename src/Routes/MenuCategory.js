const express = require("express");
const upload = require("../Common/multer");

const {
  menuCreate,
  getMenu,
  updateMenu,
  deleteMenu,
} = require("../Controllers/MenuCategory");
const { requireSigning, adminMiddleware } = require("../Common/AuthGuard");
const router = express.Router();

router.post(
  "/menu",
  requireSigning,
  adminMiddleware,
  upload.single("menuImage"),
  menuCreate
);
router.get("/menu", getMenu);
router.put("/menu/:id", requireSigning, adminMiddleware, updateMenu);
router.delete("/menu/:id", requireSigning, adminMiddleware, deleteMenu);

module.exports = router;
