const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const user = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      let token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(401);
        throw new Error();
      }
      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Get user from token
      req.user = await user.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  } else {
    res.status(401);
    throw new Error("Not token Authorization");
  }
});

module.exports = {
  protect,
};
