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
      type: "Food",
      shipping,
      foodImg: imageUploader,
    });
    _food.save((error, food) => {
      if (error) {
        res.status(400).json({ message: "Already created!", error });
      } else if (food) {
        res.status(201).json({ message: "Food created successful!", food });
      }
    });
  } catch (error) {
    console.log(error);
  }
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
exports.foodsList = async (req, res) => {
  const { sort, order } = req.body;
  await Food.find({})
    .populate("menuId")
    .sort([[sort, order]])
    .exec((error, foods) => {
      if (error)
        res.status(400).json({ error: "Something went wrong!", error });
      if (foods) {
        res.status(200).json({ foods });
      }
    });
};
exports.foodUpdate = async (req, res) => {};
exports.foodDelete = async (req, res) => {};
