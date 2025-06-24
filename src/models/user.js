const mongoose = require("mongoose");

//omments
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 25,
    },
    lastName: {
      type: String,
      maxLength: 25,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      min: 18,
      validate(value) {
        if (!["Male", "Female", "Others"].includes(value)) {
          throw new Error("Gender date is not valid!");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg",
    },
    about: {
      type: String,
      default: "This the default about of the User!",
      maxLength: 200,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
