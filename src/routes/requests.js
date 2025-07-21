const express = require("express");
const mongoose = require("mongoose");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "intrested"];

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      if (fromUserId.toString() === toUserId) {
        return res
          .status(400)
          .json({ message: " From and Receiver user is same." });
      }

      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
        return res
          .status(400)
          .json({ message: "Invalid toUserId: " + toUserId });
      }

      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.status(400).json({ message: "User Id doesn't exist." });
      }

      // check if there is existing connectionRequest

      const existingConnetctionREquest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      // The above one is compond indexing.

      if (existingConnetctionREquest) {
        return res
          .status(400)
          .json({ message: "Connection request already exist!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({ message: status + " req sent sucessfully", data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
