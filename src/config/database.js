const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://sisir:sisir@devtinder.wlkq4nb.mongodb.net/DEV_TINDER"
  );
};

module.exports = { connectDB };
