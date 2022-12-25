const Menu = require("../Model/MenuCategory");
const slugify = require("slugify");
const shortid = require("shortid");
exports.menuCreate = async (req, res) => {
  const { title, menuImage } = req.body;
  await Menu.findOne({ title }).exec(async (error, menu) => {
    if (error) res.status(400).json({ error });
    else if (menu) res.status(400).json({ message: "Already Created" });
    else if (!menu) {
      const _newMenu = await new Menu({
        title,
        slug: `${slugify(title)}-${shortid.generate()}`,
        menuImage,
      });
      _newMenu.save((error, menu) => {
        if (error)
          res.status(400).json({ error: "Something went wrong!", error });
        if (menu) {
          res.status(201).json({ message: "Menu create successful!" });
        }
      });
    }
  });
};
exports.getMenu = async (req, res) => {
  await Menu.find({}).exec((error, menu) => {
    if (error) res.status(400).json({ error: "Something went wrong!", error });
    if (menu) {
      res.status(200).json({ menu });
    }
  });
};
exports.updateMenu = async (req, res) => {
  const params = req.params.id;
  await Menu.findById({ _id: params }).exec(async (error, menu) => {
    if (error) res.status(400).json({ error: "Something went wrong!", error });
    if (!menu) {
      res.status(404).json({ message: "Not found" });
    }
    if (menu) {
      const updated = await Menu.findOneAndUpdate(
        { _id: params },
        { $set: { ...req.body } },
        { new: true }
      );
      if (updated) {
        res.status(200).json({ updated });
      }
    }
  });
};
exports.deleteMenu = async (req, res) => {
  const params = req.params.id;
  await Menu.findById({ _id: params }).exec(async (error, menu) => {
    if (error) res.status(400).json({ error: "Something went wrong!", error });
    if (menu) {
      await Menu.findByIdAndDelete({ _id: params }).exec((error, menu) => {
        if (error)
          res.status(400).json({ error: "Something went wrong!", error });
        if (menu) {
          res.status(200).json({ message: "Deleted Successful!" });
        }
      });
    }
  });
};
