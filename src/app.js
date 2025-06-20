const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const { adminAuth } = require("./middlewares/auth");
const User = require("./models/user");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Sign up User and save the data in DB
app.post("/signup", async (req, res) => {
  //Creating a new instance of the user Model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Sucessfully.");
  } catch (err) {
    res.status(500).send("Error Saving the user" + err.message);
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
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("User updated sucessfully.");
  } catch (err) {
    res.send("Something went wrong");
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
