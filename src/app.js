const express = require("express");

const app = express();

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.get("/user", (req, res) => {
  const id = req.body.id;
  if (id === "1000") {
    res.json({ Name: "Sisir", Role: "Associate" });
  } else {
    res.send("Not found");
  }
});

app.use("/", (req, res) => {
  res.send("Hello from the dahboard server.....");
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000....");
});
