const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Hello from the dahboard server.....");
});

app.use("/test", (req, res) => {
  res.send("Hello from the test server.....");
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000....");
});
