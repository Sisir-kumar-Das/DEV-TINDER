const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const { adminAuth } = require("./middlewares/auth");
const User = require("./models/user");

//app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.post("/signup", async (req, res) => {
  //Creating a new instance of the user Model
  const userData = {
    firstName: "Sisir",
    lastName: "Kumar Das",
    emailId: "sisirkumardas1502@gmail.com",
    password: "papi@1234",
    age: 25,
    gender: "Male",
  };

  const user = new User(userData);
  await user.save();
  res.send("User Added Sucessfully.");
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
