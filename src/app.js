const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  console.log(req.body);
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
