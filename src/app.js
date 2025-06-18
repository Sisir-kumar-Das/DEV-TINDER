const express = require("express");

require("./config/database");

const app = express();

const { adminAuth } = require("./middlewares/auth");

//app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server is listening at port 3000....");
});
