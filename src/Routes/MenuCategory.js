const express = require("express");
const { uploads } = require("../Common/Cloudinary");
const upload = require("../Common/multer");
const fs = require("fs");
const {
  menuCreate,
  getMenu,
  updateMenu,
  deleteMenu,
} = require("../Controllers/MenuCategory");
const router = express.Router();

router.post(
  "/menu",
  upload.single("menuImage"),
  // async (req, res) => {
  // const uploader = async (path) => await uploads(path, "Images");

  // if (req.method === "POST") {
  //   let { path } = req.file;
  //   let uploadFile = await uploader(path);
  //   fs.unlinkSync(path);
  //   res.status(200).json({
  //     message: "Image uploaded",
  //     data: uploadFile,
  //   });
  // }
  // if (req.method === "POST") {
  //   const urls = [];
  //   const files = req.files;
  //   for (let file of files) {
  //     let { path } = file;
  //     const newPath = await uploader(path);
  //     urls.push(newPath);
  //     fs.unlinkSync(path);
  //   }
  //   res.status(200).json({
  //     message: "Image uploaded",
  //     data: urls,
  //   });
  // }
  // }
  menuCreate
);
router.get("/menu", getMenu);
router.put("/menu/:id", updateMenu);
router.delete("/menu/:id", deleteMenu);

module.exports = router;
