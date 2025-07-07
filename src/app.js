const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const { adminAuth } = require("./middlewares/auth");
const validator = require("validator");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Sign up User and save the data in DB

//login user

//profile of the user

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
