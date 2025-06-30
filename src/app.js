const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const { adminAuth } = require("./middlewares/auth");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Sign up User and save the data in DB
app.post("/signup", async (req, res) => {
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

//login user
app.post("/login", async (req, res) => {
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

//profile of the user
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established.");
    app.listen(3000, () => {
      console.log("Server is listening at port 3000....");
    });
  })
  .catch((err) => {
    console.log("Error connecting to DB");
  });
