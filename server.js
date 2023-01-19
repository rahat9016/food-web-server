const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const AuthRouter = require("./src/Routes/Auth");
const MenuRouter = require("./src/Routes/MenuCategory");
const FoodRouter = require("./src/Routes/Food");
const OffersRouter = require("./src/Routes/Offers");
const OrderRouter = require("./src/Routes/Order");
const StripeRouter = require("./src/Routes/Stripe");
const app = express();

// Connect with database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected with database ");
  })
  .catch((error) => {
    console.log("Database Error---->", error);
  });

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// Routers
app.use("/", AuthRouter);
app.use("/", MenuRouter);
app.use("/", FoodRouter);
app.use("/", OffersRouter);
app.use("/", OrderRouter);
app.use("/", StripeRouter);
//404 Handler
app.use((req, res, next) => {
  next("Request URL not found!");
});
app.use((error, req, res, next) => {
  if (error) {
    res.status(500).send(error);
  } else {
    res.status(500).send("There was an Error!");
  }
});
// Server listener
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
