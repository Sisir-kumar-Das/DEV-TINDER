const express = require("express");
const router = express.Router();
const User = require("../models/user");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const { userAuth } = require("../middlewares/auth");

router.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);
    // Ecrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const paswordHash = await bcrypt.hash(password, 10);
    //Creating a new instance of the user Model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: paswordHash,
    });

    await user.save();
    res.send("User Added Sucessfully.");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Email id is not valid.");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email id is not exist, please sign up.");
    }
    const isPaswordValid = await user.validatePassword(password);
    if (isPaswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Sucessful!");
    } else {
      throw new Error("Email ID or password does not exist!");
    }
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

module.exports = router;
