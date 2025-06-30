const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //read thetoken from rewq cookies
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Token is not valid.");
    }
    // valkidate the token
    const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
    const { _id } = decodedObj;
    // Find the user is exist
    const user = await User.findById(_id);
    if (!user) {
      throw new error("User not found!");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

const adminAuth = (req, res, next) => {
  const id = req.body.id;
  if (id !== "1000") {
    res.status(401).send("You are not authorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
