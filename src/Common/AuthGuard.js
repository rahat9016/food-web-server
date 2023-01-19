const jwt = require("jsonwebtoken");

// Check Signing
exports.requireSigning = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization require!" });
  }
  next();
};
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(405).json({ message: "Access Denied!" });
  }
  next();
};
exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(405).json({ message: "Access Denied!" });
  }
  next();
};
