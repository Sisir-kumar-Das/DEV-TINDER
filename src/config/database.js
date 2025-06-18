const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect("mongodb+srv://sisir:sisir@devtinder.wlkq4nb.mongodb.net/");
};

connectDB()
  .then(() => {
    console.log("Database connection established.");
  })
  .catch((err) => {
    console.log("Error connecting to DB");
  });
