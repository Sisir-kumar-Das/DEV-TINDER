const express = require("express");

const app = express();

app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.use("/user", (req, res, next) => {
  const id = req.body.id;
  if (id !== "1000") {
    res.status(401).send("You are not authorized");
  } else {
    next();
  }
});

app.get("/user", (req, res) => {
  res.json({ Name: "Sisir", Role: "Associate" });
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000....");
});
