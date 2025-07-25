const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// Get all the pending connection request for the loggedInuser

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "intrested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "age",
      "about",
      "skills",
    ]);
    if (!connectionRequests.length) {
      return res.status(400).json({ message: "No request found" });
    }
    res
      .status(200)
      .json({ message: "Data fetched sucessfully", data: connectionRequests });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "intrested" },
        { toUserId: loggedInUser._id, status: "intrested" },
      ],
    });

    res.status(200).json({ data: connectionRequests });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = userRouter;
