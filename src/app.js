const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const { adminAuth } = require("./middlewares/auth");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

app.use(express.json());

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
    const isPaswordValid = await bcrypt.compare(password, user.password);
    if (isPaswordValid) {
      res.send("Login Sucessful!");
    } else {
      throw new Error("Email ID or password does not exist!");
    }
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

// Fetch the user details from DB by EmailId
app.get("/user", async (req, res) => {
  const userEmailId = req.query.emailId;

  try {
    const user = await User.find({ emailId: userEmailId });
    if (user.length) {
      res.send(user);
    } else {
      res.send("User not found.");
    }
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

//fetch all the users
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

//delete user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const del = await User.findByIdAndDelete(userId);
    res.send("User deleted sucessfully.");
  } catch (err) {
    res.send("Something went wrong");
  }
});

//update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  const ALLOWED_UPDATES = ["photoUrl", "about", "age", "skills", "gender"];
  const isUpdateAllowed = Object.keys(data).every((k) =>
    ALLOWED_UPDATES.includes(k)
  );

  if (!isUpdateAllowed) {
    res.status(400).send("Update is not allowed.");
  } else {
    try {
      if (data?.skills.length > 10) {
        throw new Error("Cant add more than 10 skills.");
      }
      const user = await User.findByIdAndUpdate({ _id: userId }, data, {
        returnDocument: "before",
        runValidators: true,
      });
      res.send("User updated sucessfully.");
    } catch (err) {
      res.send("Something went wrong" + err.message);
    }
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
