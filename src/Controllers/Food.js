const { uploadMultipleImages } = require("../Common/CommonMiddleware");
const Food = require("../Model/Food");

exports.foodCreate = async (req, res) => {
  const { name, price, quantity, description, menuId, shipping } = req.body;
  try {
    const imageUploader = await uploadMultipleImages(req, res);
    const _food = await new Food({
      name,
      price,
      quantity,
      description,
      menuId,
      shipping,
      foodImg: imageUploader,
    });
    _food.save((error, food) => {});
  } catch (error) {}
};
exports.foodGet = async (req, res) => {
  try {
    await Food.find({})
      .populate("menuId")
      .exec((error, food) => {
        if (error)
          res.status(400).json({ error: "Something went wrong!", error });
        if (food) {
          res.status(200).json({ food });
        }
      });
  } catch (error) {}
};
exports.foodUpdate = async (req, res) => {};
exports.foodDelete = async (req, res) => {};
