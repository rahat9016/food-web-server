const { uploadSingleImage } = require("../Common/CommonMiddleware");
const Offers = require("../Model/Offers");

exports.offerCreate = async (req, res) => {
  const { name, price, menuId, shipping } = req.body;
  try {
    const imageUploader = await uploadSingleImage(req, res);
    if (name && imageUploader) {
      const _offers = await new Offers({
        name,
        price,
        menuId,
        type: "Offer",
        shipping,
        offerImg: imageUploader,
      });
      _offers.save((error, offers) => {
        if (error) {
          res.status(400).json({ error });
        } else if (offers) {
          res
            .status(201)
            .json({ message: "offers created successful!", offers });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.getOffers = async (req, res) => {
  await Offers.find({})
    .populate("menuId")
    .exec((error, offers) => {
      if (error) {
        res.status(400).json({ error });
      }
      if (offers) {
        res.status(200).json({ offers });
      }
    });
};
