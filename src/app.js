const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const { adminAuth } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
