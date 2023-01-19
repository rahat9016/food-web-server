const User = require("../Model/Auth");
const Order = require("../Model/Order");
exports.createOrder = async (req, res) => {
  const { cartItems, values, payment, totalAmountAfterDiscount } = req.body;

  let user = await User.findOne({
    _id: req.user._id,
  });

  let foodArray = [];
  if (cartItems) {
    for (let i = 0; i < cartItems.length; i++) {
      let object = {};
      object.food = cartItems[i].food_id;
      object.quantity = cartItems[i].food_qty;
      object.price = cartItems[i].food_price;
      object.onModel = cartItems[i].food_type;
      foodArray.push(object);
    }
  }
  const foodPrice = foodArray.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.quantity * nextValue.price;
  }, 0);
  try {
    if (foodArray && values && payment && totalAmountAfterDiscount) {
      let newOrder = await Order({
        foods: foodArray,
        totalAmount: foodPrice,
        totalAfterDiscount: totalAmountAfterDiscount,
        paymentIntent: payment,
        customerInformation: values,
        orderBy: user._id,
      });
      newOrder.save((error, newOrder) => {
        if (error)
          res.status(400).json({ error: "Something went wrong!", error });
        if (newOrder) {
          res
            .status(201)
            .json({ message: "Your order  successfully done!", newOrder });
        }
      });
    }
  } catch (error) {}
};

exports.getOrder = async (req, res) => {
  let user = await User.findOne({
    _id: req.user._id,
  });
  await Order.find({
    orderBy: user._id,
  })
    .populate("foods.food", "_id name foodImg offerImg")
    .exec((error, orderItems) => {
      console.log(orderItems);
      let orderArray = [];
      if (orderItems) {
        for (let i = 0; i < orderItems.length; i++) {
          let obj = {};
          obj._id = orderItems[i]._id;
          obj.foods = orderItems[i].foods;
          obj.totalAmount = orderItems[i].totalAmount;
          obj.totalAfterDiscount = orderItems[i].totalAfterDiscount;
          obj.orderStatus = orderItems[i].orderStatus;
          orderArray.push(obj);
        }
      }
      if (error)
        res.status(400).json({ error: "Something went wrong!", error });
      if (orderArray) {
        res.status(200).json({ orderArray });
      }
    });
};
