const { uploads } = require("./Cloudinary");
const fs = require("fs");

exports.uploadSingleImage = async (req, res) => {
  const uploader = async (path) => await uploads(path, "Images");
  let uploadFile;
  if (req.method === "POST") {
    let { path } = req.file;
    uploadFile = await uploader(path);
    fs.unlinkSync(path);
  }
  return uploadFile;
};
exports.uploadMultipleImages = async (req, res) => {
  const uploader = async (path) => await uploads(path, "Images");

  const urls = [];
  if (req.method === "POST") {
    const files = req.files;
    for (let file of files) {
      let { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
  }

  return urls;
};
