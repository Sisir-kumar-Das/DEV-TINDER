const express = require("express");

const app = express();

const { adminAuth } = require("./middlewares/auth");

app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.get("/user", adminAuth, (req, res) => {
  res.json({ Name: "Sisir", Role: "Associate" });
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000....");
});
