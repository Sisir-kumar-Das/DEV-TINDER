const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://sisir:pPBtGF7XRx8xA572@devtinder.wlkq4nb.mongodb.net/DEV_TINDER",
  );
};

module.exports = { connectDB };
