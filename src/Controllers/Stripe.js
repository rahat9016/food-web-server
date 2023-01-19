const Food = require("../Model/Food");
const Order = require("../Model/Order");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPayment = async (req, res) => {
  const { id } = req.body;

  const orderItem = await Order.find({
    $and: [{ orderBy: req.user._id }, { _id: id }],
  }).exec();
  const { totalAfterDiscount } = orderItem[0];
  console.log(totalAfterDiscount);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAfterDiscount,
    currency: "USD",
  });
  res.send({ clientSecret: paymentIntent.client_secret });
};

exports.updatePaymentInOrder = async (req, res) => {
  const { id, paymentIntent } = req.body;
  try {
    await Order.findOneAndUpdate(
      { _id: id },
      { paymentIntent: paymentIntent }
    ).exec(async (error, update) => {
      if (error) return res.status(400).json({ error: error });
      update.foods.forEach(async (food) => {
        let { food_id, quantity } = food;
        await Food.findOneAndUpdate(
          { _id: food_id },
          { $inc: { sold: quantity } }
        );
      });
      if (update) {
        res.status(200).json({
          message: "Payment Successful",
          updateOrder: update,
        });
      }
    });
  } catch (error) {
    if (error) return res.status(400).json({ error: error });
  }
};
